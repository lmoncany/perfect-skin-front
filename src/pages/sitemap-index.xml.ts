import type { APIRoute } from "astro";
import { SITE } from "@/config";
import {
  getAllPages,
  getAllPosts,
  getAuthors,
  getBrands,
  getCategories,
  getTags,
} from "@/lib/content";

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const addUrl = (urls: string[], url: string) => {
  urls.push(`  <url><loc>${escapeXml(url)}</loc></url>`);
};

const addPaginatedUrls = (
  urls: string[],
  baseUrl: string,
  totalItems: number,
  pageSize: number
) => {
  const lastPage = Math.ceil(totalItems / pageSize);
  for (let page = 2; page <= lastPage; page += 1) {
    addUrl(urls, `${baseUrl}${page}/`);
  }
};

export const GET: APIRoute = async () => {
  const origin = SITE.website.replace(/\/$/, "");
  const [posts, pages, categories, tags, brands, authors] = await Promise.all([
    getAllPosts(),
    getAllPages(),
    getCategories(),
    getTags(),
    getBrands(),
    getAuthors(),
  ]);

  const urls: string[] = [];
  addUrl(urls, `${origin}/`);

  for (const post of posts) {
    addUrl(urls, `${origin}/${post.slug}/`);
  }

  for (const page of pages) {
    addUrl(urls, `${origin}/${page.slug}/`);
  }

  for (const category of categories) {
    const categoryPosts = posts.filter(post => post.categories.includes(category.slug));
    if (categoryPosts.length === 0) continue;
    addUrl(urls, `${origin}/categorie/${category.slug}/`);
    addPaginatedUrls(
      urls,
      `${origin}/categorie/${category.slug}/`,
      categoryPosts.length,
      SITE.postPerPage
    );
  }

  for (const tag of tags) {
    const tagPosts = posts.filter(post => post.tags.includes(tag.slug));
    if (tagPosts.length === 0) continue;
    addUrl(urls, `${origin}/tag/${tag.slug}/`);
    addPaginatedUrls(urls, `${origin}/tag/${tag.slug}/`, tagPosts.length, SITE.postPerPage);
  }

  for (const brand of brands) {
    const brandPosts = posts.filter(post => post.brands?.includes(brand.slug));
    if (brandPosts.length === 0) continue;
    addUrl(urls, `${origin}/marque/${brand.slug}/`);
    addPaginatedUrls(
      urls,
      `${origin}/marque/${brand.slug}/`,
      brandPosts.length,
      SITE.postPerPage
    );
  }

  for (const author of authors) {
    const authorPosts = posts.filter(post => post.author.slug === author.slug);
    if (authorPosts.length === 0) continue;
    addUrl(urls, `${origin}/auteur/${author.slug}/`);
    addPaginatedUrls(
      urls,
      `${origin}/auteur/${author.slug}/`,
      authorPosts.length,
      SITE.postPerPage
    );
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
    "\n"
  )}\n</urlset>`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
