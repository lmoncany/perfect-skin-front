// Unified content-access layer with build-time caching.
//
// The WordPress server is on shared hosting and can't handle many concurrent
// GraphQL requests. This module fetches ALL posts once at build start, caches
// them in memory, and derives category/tag/slug lookups from that cache.
// This means only ~3 GraphQL requests total (posts, categories, tags) instead
// of hundreds.

import type { Brand, Category, Page, Post, Tag } from "./types";
import {
  mockBrands,
  mockCategories,
  mockPosts,
  mockTags,
  type MockPost,
} from "./mock-data";
import { mockPages } from "./mock-pages";
import { isWpConfigured, wpFetch } from "./wp";
import {
  GET_ALL_PAGES,
  GET_ALL_POSTS,
  GET_CATEGORIES,
  GET_TAGS,
} from "./queries";

// ---------- WP response shapes ----------

interface WPPostNode {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: {
    node: { name: string; slug: string; avatar?: { url: string } | null };
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number };
    };
  } | null;
  categories: { nodes: Array<{ slug: string; name: string }> };
  tags: { nodes: Array<{ slug: string; name: string }> };
  seo?: {
    title?: string;
    description?: string;
    canonicalUrl?: string;
    robots?: string;
    openGraph?: {
      title?: string;
      description?: string;
      image?: { url?: string } | null;
      type?: string;
    };
    jsonLd?: { raw?: string };
  } | null;
}

interface WPPageNode {
  id: string;
  databaseId: number;
  slug: string;
  title: string;
  content: string;
  modified: string;
  seo?: WPPostNode["seo"];
}

// ---------- Transformers ----------

function wpNodeToPost(n: WPPostNode): Post {
  const canonical =
    n.seo?.canonicalUrl || `https://perfect-skin.fr/${n.slug}`;
  return {
    id: n.id,
    slug: n.slug,
    title: n.title,
    excerpt: stripHtml(n.excerpt),
    content: n.content,
    date: n.date,
    modified: n.modified,
    author: {
      name: n.author.node.name,
      slug: n.author.node.slug,
      avatar: n.author.node.avatar?.url,
    },
    featuredImage: n.featuredImage
      ? {
          url: n.featuredImage.node.sourceUrl,
          alt: n.featuredImage.node.altText,
          width: n.featuredImage.node.mediaDetails.width,
          height: n.featuredImage.node.mediaDetails.height,
        }
      : undefined,
    categories: n.categories.nodes.map(c => c.slug),
    tags: n.tags.nodes.map(t => t.slug),
    seo: {
      title: n.seo?.title || n.title,
      description: n.seo?.description || stripHtml(n.excerpt).slice(0, 160),
      canonicalUrl: canonical,
      robots: n.seo?.robots,
      openGraph: {
        title: n.seo?.openGraph?.title || n.title,
        description:
          n.seo?.openGraph?.description ||
          n.seo?.description ||
          stripHtml(n.excerpt).slice(0, 160),
        image: n.seo?.openGraph?.image?.url,
        type: (n.seo?.openGraph?.type as "article") || "article",
      },
      jsonLd: n.seo?.jsonLd?.raw || "",
    },
  };
}

function wpPageToPage(n: WPPageNode): Page {
  const canonical = n.seo?.canonicalUrl || `https://perfect-skin.fr/${n.slug}/`;
  return {
    id: n.id,
    slug: n.slug,
    title: n.title,
    content: n.content,
    modified: n.modified,
    seo: {
      title: n.seo?.title || n.title,
      description: n.seo?.description || "",
      canonicalUrl: canonical,
      robots: n.seo?.robots,
      openGraph: {
        title: n.seo?.openGraph?.title || n.title,
        description:
          n.seo?.openGraph?.description || n.seo?.description || "",
        image: n.seo?.openGraph?.image?.url,
        type: "website",
      },
      jsonLd: n.seo?.jsonLd?.raw || "",
    },
  };
}

function mockToPost(m: MockPost): Post {
  return m as Post;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractPostNodes(nodes: unknown[]): WPPostNode[] {
  return nodes.filter(
    (n): n is WPPostNode =>
      n != null && typeof n === "object" && "slug" in n && "excerpt" in n
  );
}

function byDateDesc(a: Post, b: Post): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

// ---------- Build-time cache ----------
// Fetches data once and reuses across all pages during SSG build.

interface ContentNodesResp {
  contentNodes: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: unknown[];
  };
}

let _postsCache: Post[] | null = null;
let _postsPromise: Promise<Post[]> | null = null;

let _categoriesCache: Category[] | null = null;
let _categoriesPromise: Promise<Category[]> | null = null;

let _tagsCache: Tag[] | null = null;
let _tagsPromise: Promise<Tag[]> | null = null;

let _pagesCache: Page[] | null = null;
let _pagesPromise: Promise<Page[]> | null = null;

async function fetchAllPostsFromWP(): Promise<Post[]> {
  const all: WPPostNode[] = [];
  let cursor: string | undefined;
  let hasMore = true;
  let page = 1;
  while (hasMore) {
    const vars: Record<string, unknown> = { first: 100 };
    if (cursor) vars.after = cursor;
    console.log(`[content] Fetching posts page ${page}...`);
    const resp: ContentNodesResp = await wpFetch<ContentNodesResp>(
      GET_ALL_POSTS,
      vars
    );
    all.push(...extractPostNodes(resp.contentNodes.nodes));
    hasMore = resp.contentNodes.pageInfo.hasNextPage;
    cursor = resp.contentNodes.pageInfo.endCursor ?? undefined;
    page++;
  }
  console.log(`[content] Fetched ${all.length} posts total.`);
  return all.map(wpNodeToPost).sort(byDateDesc);
}

async function fetchCategoriesFromWP(): Promise<Category[]> {
  console.log("[content] Fetching categories...");
  const data = await wpFetch<{ categories: { nodes: Category[] } }>(
    GET_CATEGORIES
  );
  console.log(`[content] Fetched ${data.categories.nodes.length} categories.`);
  return data.categories.nodes;
}

async function fetchTagsFromWP(): Promise<Tag[]> {
  console.log("[content] Fetching tags...");
  const data = await wpFetch<{ tags: { nodes: Tag[] } }>(GET_TAGS);
  console.log(`[content] Fetched ${data.tags.nodes.length} tags.`);
  return data.tags.nodes;
}

async function fetchPagesFromWP(): Promise<Page[]> {
  console.log("[content] Fetching pages...");
  const data = await wpFetch<{ contentNodes: { nodes: unknown[] } }>(
    GET_ALL_PAGES
  );
  const pages = data.contentNodes.nodes.filter(
    (n): n is WPPageNode =>
      n != null && typeof n === "object" && "slug" in n && "content" in n
  );
  console.log(`[content] Fetched ${pages.length} pages.`);
  return pages.map(wpPageToPage);
}

// ---------- Public API (cached) ----------

export async function getAllPosts(): Promise<Post[]> {
  if (!isWpConfigured()) {
    return [...mockPosts].map(mockToPost).sort(byDateDesc);
  }
  if (_postsCache) return _postsCache;
  if (!_postsPromise) _postsPromise = fetchAllPostsFromWP();
  _postsCache = await _postsPromise;
  return _postsCache;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts();
  return all.find(p => p.slug === slug) ?? null;
}

export async function getPostsByCategory(slug: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter(p => p.categories.includes(slug));
}

export async function getPostsByTag(slug: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter(p => p.tags.includes(slug));
}

export async function getPostsByBrand(slug: string): Promise<Post[]> {
  if (!isWpConfigured()) {
    return mockPosts
      .filter(p => p.brands?.includes(slug))
      .map(mockToPost)
      .sort(byDateDesc);
  }
  return [];
}

export async function getCategories(): Promise<Category[]> {
  if (!isWpConfigured()) return mockCategories;
  if (_categoriesCache) return _categoriesCache;
  if (!_categoriesPromise) _categoriesPromise = fetchCategoriesFromWP();
  _categoriesCache = await _categoriesPromise;
  return _categoriesCache;
}

export async function getTags(): Promise<Tag[]> {
  if (!isWpConfigured()) return mockTags;
  if (_tagsCache) return _tagsCache;
  if (!_tagsPromise) _tagsPromise = fetchTagsFromWP();
  _tagsCache = await _tagsPromise;
  return _tagsCache;
}

export async function getBrands(): Promise<Brand[]> {
  return mockBrands;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find(c => c.slug === slug) ?? null;
}

export async function getTag(slug: string): Promise<Tag | null> {
  const all = await getTags();
  return all.find(t => t.slug === slug) ?? null;
}

export async function getBrand(slug: string): Promise<Brand | null> {
  const all = await getBrands();
  return all.find(b => b.slug === slug) ?? null;
}

export async function getAllPages(): Promise<Page[]> {
  if (!isWpConfigured()) return mockPages;
  if (_pagesCache) return _pagesCache;
  if (!_pagesPromise) _pagesPromise = fetchPagesFromWP();
  _pagesCache = await _pagesPromise;
  return _pagesCache;
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (isWpConfigured()) {
    try {
      const all = await getAllPages();
      const found = all.find(p => p.slug === slug);
      if (found) return found;
    } catch {
      // Fall through to mock if WP errors.
    }
  }
  return mockPages.find(p => p.slug === slug) ?? null;
}

export async function getRelatedPosts(
  post: Post,
  limit: number = 4
): Promise<Post[]> {
  const primary = post.categories[0];
  if (!primary) return [];
  const all = await getPostsByCategory(primary);
  return all.filter(p => p.slug !== post.slug).slice(0, limit);
}
