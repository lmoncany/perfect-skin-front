// Unified content-access layer with runtime caching.
//
// The WordPress server is on shared hosting and can't handle many concurrent
// GraphQL requests. This module fetches content lazily on demand and keeps a
// short-lived in-memory cache so live pages can update without waiting for a redeploy.
// The cache is shared by whatever Cloudflare worker instance serves the request.

import type {
  AuthorArchive,
  Brand,
  Category,
  Page,
  Post,
  Tag,
} from "./types";
import {
  mockCategories,
  mockPosts,
  mockTags,
  type MockPost,
} from "./mock-data";
import {
  brandCatalog,
  findBrandCatalogEntry,
  type BrandCatalogEntry,
} from "./brand-catalog";
import { mockPages } from "./mock-pages";
import { isWpConfigured, wpFetch } from "./wp";
import {
  normalizeWordPressPublicUrl,
  rewriteWordPressJsonLd,
} from "./rewrite-content";
import {
  GET_ALL_PAGES,
  GET_ALL_POSTS,
  GET_ALL_POSTS_WITH_BRANDS,
  GET_BRANDS,
  GET_CATEGORIES,
  GET_TAGS,
} from "./queries";
import { decodeHTML } from "entities";

const USE_MOCK_FIXTURES = import.meta.env.DEV && !isWpConfigured();
const STATIC_PAGE_SLUGS = new Set([
  "a-propos",
  "contact",
  "politique-confidentialite",
]);
const USE_WP_BRAND_TAXONOMY =
  isWpConfigured() &&
  (import.meta.env.WORDPRESS_BRAND_SOURCE ?? "").toLowerCase() === "taxonomy";

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
    node?: { name?: string | null; slug?: string | null; avatar?: { url?: string | null } | null } | null;
  } | null;
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      mediaDetails: { width: number; height: number };
    };
  } | null;
  categories?: { nodes?: Array<{ slug?: string | null; name?: string | null } | null> | null } | null;
  tags?: { nodes?: Array<{ slug?: string | null; name?: string | null } | null> | null } | null;
  brands?: {
    nodes?: Array<
      { slug?: string | null; name?: string | null; description?: string | null } | null
    > | null;
  } | null;
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

function decodeText(value: string | null | undefined, fallback: string = ""): string {
  return value ? decodeHTML(value) : fallback;
}

function wpNodeToPost(n: WPPostNode): Post {
  const canonical =
    normalizeWordPressPublicUrl(n.seo?.canonicalUrl) ||
    `https://perfect-skin.fr/${n.slug}`;
  const authorNode = n.author?.node;
  const categorySlugs = (n.categories?.nodes ?? [])
    .filter((c): c is { slug: string; name: string } => !!c?.slug)
    .map(c => c.slug);
  const tagSlugs = (n.tags?.nodes ?? [])
    .filter((t): t is { slug: string; name: string } => !!t?.slug)
    .map(t => t.slug);
  const brandSlugs = n.brands?.nodes
    ? n.brands.nodes
        .filter(
          (b): b is { slug: string; name: string; description?: string } => !!b?.slug
        )
        .map(b => b.slug)
    : detectBrandSlugsFromText(n);
  return {
    id: n.id,
    slug: n.slug,
    title: decodeText(n.title),
    excerpt: stripHtml(n.excerpt),
    content: n.content,
    date: n.date,
    modified: n.modified,
    author: {
      name: decodeText(authorNode?.name, "Perfect Skin"),
      slug: authorNode?.slug || "redaction",
      avatar: authorNode?.avatar?.url ?? undefined,
    },
    featuredImage: n.featuredImage
      ? {
          url: n.featuredImage.node.sourceUrl,
          alt: n.featuredImage.node.altText,
          width: n.featuredImage.node.mediaDetails.width,
          height: n.featuredImage.node.mediaDetails.height,
        }
      : undefined,
    categories: categorySlugs,
    tags: tagSlugs,
    brands: brandSlugs,
    seo: {
      title: decodeText(n.seo?.title || n.title),
      description: n.seo?.description || stripHtml(n.excerpt).slice(0, 160),
      canonicalUrl: canonical,
      robots: n.seo?.robots,
      openGraph: {
        title: decodeText(n.seo?.openGraph?.title || n.title),
        description:
          n.seo?.openGraph?.description ||
          n.seo?.description ||
          stripHtml(n.excerpt).slice(0, 160),
        image: n.seo?.openGraph?.image?.url,
        type: (n.seo?.openGraph?.type as "article") || "article",
      },
      jsonLd: rewriteWordPressJsonLd(n.seo?.jsonLd?.raw || ""),
    },
  };
}

function wpPageToPage(n: WPPageNode): Page {
  const canonical =
    normalizeWordPressPublicUrl(n.seo?.canonicalUrl) ||
    `https://perfect-skin.fr/${n.slug}/`;
  return {
    id: n.id,
    slug: n.slug,
    title: decodeText(n.title),
    content: n.content,
    modified: n.modified,
    seo: {
      title: decodeText(n.seo?.title || n.title),
      description: n.seo?.description || "",
      canonicalUrl: canonical,
      robots: n.seo?.robots,
      openGraph: {
        title: decodeText(n.seo?.openGraph?.title || n.title),
        description:
          n.seo?.openGraph?.description || n.seo?.description || "",
        image: n.seo?.openGraph?.image?.url,
        type: "website",
      },
      jsonLd: rewriteWordPressJsonLd(n.seo?.jsonLd?.raw || ""),
    },
  };
}

function mockToPost(m: MockPost): Post {
  return m as Post;
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return decodeText(
    html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
  );
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

function normalizeText(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .toLowerCase()
    .trim();
}

type BrandTextSource = {
  title?: string;
  excerpt?: string;
  content?: string;
  seo?: { title?: string; description?: string } | null;
};

function brandTextMatches(post: BrandTextSource, brand: BrandCatalogEntry): boolean {
  const haystack = normalizeText(
    [
      post.title,
      post.excerpt,
      stripHtml(post.content),
      post.seo?.title,
      post.seo?.description,
    ]
      .filter(Boolean)
      .join(" ")
  );
  const candidates = [brand.slug, brand.name, ...brand.aliases].map(normalizeText);
  return candidates.some(candidate => candidate && haystack.includes(candidate));
}

function brandFromCatalogEntry(brand: BrandCatalogEntry): Brand {
  return {
    slug: brand.slug,
    name: brand.name,
    description: brand.description,
    logo: brand.logo,
  };
}

function detectBrandSlugsFromText(
  post: BrandTextSource
): string[] {
  return brandCatalog
    .filter(brand => brandTextMatches(post, brand))
    .map(brand => brand.slug);
}

function brandSlugsFromPosts(posts: Post[]): string[] {
  return Array.from(new Set(posts.flatMap(post => post.brands ?? [])));
}

function authorsFromPosts(posts: Post[]): AuthorArchive[] {
  const authors = new Map<string, AuthorArchive & { latest: string }>();

  for (const post of posts) {
    const currentModified = post.modified || post.date;
    const existing = authors.get(post.author.slug);
    if (!existing) {
      authors.set(post.author.slug, {
        name: post.author.name,
        slug: post.author.slug,
        avatar: post.author.avatar,
        description: undefined,
        count: 1,
        latest: currentModified,
      });
      continue;
    }

    existing.count += 1;
    if (!existing.avatar && post.author.avatar) existing.avatar = post.author.avatar;
    if (new Date(currentModified).getTime() > new Date(existing.latest).getTime()) {
      existing.latest = currentModified;
      existing.name = post.author.name;
    }
  }

  return Array.from(authors.values())
    .sort((a, b) => new Date(b.latest).getTime() - new Date(a.latest).getTime())
    .map(({ latest: _latest, ...author }) => author);
}

const CONTENT_CACHE_TTL_MS = 60_000;

type CacheEntry<T> = {
  value: T | null;
  promise: Promise<T> | null;
  expiresAt: number;
};

function createCacheEntry<T>(): CacheEntry<T> {
  return {
    value: null,
    promise: null,
    expiresAt: 0,
  };
}

async function readCache<T>(
  entry: CacheEntry<T>,
  loader: () => Promise<T>
): Promise<T> {
  const now = Date.now();
  if (entry.value && now < entry.expiresAt) {
    return entry.value;
  }

  if (!entry.promise) {
    entry.promise = loader()
      .then(value => {
        entry.value = value;
        entry.expiresAt = Date.now() + CONTENT_CACHE_TTL_MS;
        entry.promise = null;
        return value;
      })
      .catch(error => {
        entry.promise = null;
        throw error;
      });
  }

  return entry.promise;
}

export function clearContentCaches(): void {
  for (const cache of [
    _postsCache,
    _categoriesCache,
    _tagsCache,
    _pagesCache,
    _brandsCache,
    _authorsCache,
  ]) {
    cache.value = null;
    cache.promise = null;
    cache.expiresAt = 0;
  }
}

interface ContentNodesResp {
  contentNodes: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: unknown[];
  };
}

const _postsCache = createCacheEntry<Post[]>();

const _categoriesCache = createCacheEntry<Category[]>();

const _tagsCache = createCacheEntry<Tag[]>();

const _pagesCache = createCacheEntry<Page[]>();

const _brandsCache = createCacheEntry<Brand[]>();

const _authorsCache = createCacheEntry<AuthorArchive[]>();

async function fetchAllPostsFromWP(): Promise<Post[]> {
  const all: WPPostNode[] = [];
  let cursor: string | undefined;
  let hasMore = true;
  let page = 1;
  while (hasMore) {
    const vars: Record<string, unknown> = { first: 100 };
    if (cursor) vars.after = cursor;
    console.log(`[content] Fetching posts page ${page}...`);
    const query = USE_WP_BRAND_TAXONOMY ? GET_ALL_POSTS_WITH_BRANDS : GET_ALL_POSTS;
    const resp: ContentNodesResp = await wpFetch<ContentNodesResp>(
      query,
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
  return data.categories.nodes.map(category => ({
    ...category,
    name: decodeText(category.name),
    description: decodeText(category.description),
  }));
}

async function fetchTagsFromWP(): Promise<Tag[]> {
  console.log("[content] Fetching tags...");
  const data = await wpFetch<{ tags: { nodes: Tag[] } }>(GET_TAGS);
  console.log(`[content] Fetched ${data.tags.nodes.length} tags.`);
  return data.tags.nodes.map(tag => ({
    ...tag,
    name: decodeText(tag.name),
  }));
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
  if (USE_MOCK_FIXTURES) {
    return [...mockPosts].map(mockToPost).sort(byDateDesc);
  }
  return readCache(_postsCache, fetchAllPostsFromWP);
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
  const all = await getAllPosts();
  return all.filter(post => post.brands?.includes(slug));
}

export async function getPostsByAuthor(slug: string): Promise<Post[]> {
  const all = await getAllPosts();
  return all.filter(post => post.author.slug === slug);
}

export async function getCategories(): Promise<Category[]> {
  if (USE_MOCK_FIXTURES) return mockCategories;
  return readCache(_categoriesCache, fetchCategoriesFromWP);
}

export async function getTags(): Promise<Tag[]> {
  if (USE_MOCK_FIXTURES) return mockTags;
  return readCache(_tagsCache, fetchTagsFromWP);
}

export async function getBrands(): Promise<Brand[]> {
  if (USE_MOCK_FIXTURES) {
    return brandCatalog.map(brandFromCatalogEntry);
  }
  if (USE_WP_BRAND_TAXONOMY) {
    return readCache(_brandsCache, async () => {
      const data = await wpFetch<{
        brands: {
          nodes: Array<
            { slug: string; name: string; description?: string | null } | null
          >;
        };
      }>(GET_BRANDS);
      return (data.brands.nodes ?? [])
        .filter(
          (brand): brand is {
            slug: string;
            name: string;
            description?: string | null;
          } => !!brand?.slug
        )
        .map(brand => ({
          slug: brand.slug,
          name: brand.name,
          description: brand.description ?? "",
        }));
    });
  }
  return readCache(_brandsCache, async () => {
    const all = await getAllPosts();
    const slugs = brandSlugsFromPosts(all);
    return brandCatalog
      .filter(brand => slugs.includes(brand.slug))
      .map(brandFromCatalogEntry);
  });
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
  const found = all.find(b => b.slug === slug);
  if (found) return found;

  if (USE_WP_BRAND_TAXONOMY) {
    try {
      const data = await wpFetch<{
        brand: { slug: string; name: string; description?: string | null } | null;
      }>(
        /* GraphQL */ `
          query GetBrandBySlug($slug: ID!) {
            brand(id: $slug, idType: SLUG) {
              slug
              name
              description
            }
          }
        `,
        { slug }
      );
      if (data.brand) {
        return {
          slug: data.brand.slug,
          name: data.brand.name,
          description: data.brand.description ?? "",
        };
      }
    } catch {
      // Keep the catalog fallback below if the taxonomy endpoint is not ready yet.
    }
  }

  const match = findBrandCatalogEntry(slug);
  return match ? brandFromCatalogEntry(match) : null;
}

export async function getAuthors(): Promise<AuthorArchive[]> {
  return readCache(_authorsCache, async () => {
    const posts = await getAllPosts();
    return authorsFromPosts(posts);
  });
}

export async function getAuthor(slug: string): Promise<AuthorArchive | null> {
  const all = await getAuthors();
  return all.find(author => author.slug === slug) ?? null;
}

export async function getAllPages(): Promise<Page[]> {
  if (USE_MOCK_FIXTURES) return mockPages;
  return readCache(_pagesCache, fetchPagesFromWP);
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  if (isWpConfigured()) {
    try {
      const all = await getAllPages();
      const found = all.find(p => p.slug === slug);
      if (found) return found;
    } catch {
      if (!USE_MOCK_FIXTURES) {
        throw new Error(`WordPress page fetch failed for "${slug}".`);
      }
    }
  }
  if (STATIC_PAGE_SLUGS.has(slug)) {
    return mockPages.find(p => p.slug === slug) ?? null;
  }
  return USE_MOCK_FIXTURES ? mockPages.find(p => p.slug === slug) ?? null : null;
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
