import type { APIRoute } from "astro";
import { SITE } from "@/config";
import { getAllPages, getAllPosts } from "@/lib/content";

/**
 * /llms-full.txt — concatenated plain-text of every article and page.
 * Purpose: let AI search engines ingest the full corpus in a single
 * fetch, without parsing HTML or hitting the sitemap one URL at a time.
 *
 * Output shape (per llmstxt.org convention):
 *   # Site name
 *   > tagline
 *   --- Article title (URL) ---
 *   (plain-text article body)
 *
 * All HTML is stripped. Markdown is not emitted — this is a plain-text
 * channel optimized for LLM tokenization, not human reading.
 */

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, _lvl, inner) => {
      const txt = inner.replace(/<[^>]+>/g, "").trim();
      return `\n\n## ${txt}\n\n`;
    })
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner) => {
      const txt = inner.replace(/<[^>]+>/g, "").trim();
      return `- ${txt}\n`;
    })
    .replace(/<(p|br|div|section|article)[^>]*>/gi, "\n")
    .replace(/<\/(p|br|div|section|article|ul|ol)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export const GET: APIRoute = async () => {
  const origin = SITE.website.replace(/\/$/, "");
  const [posts, pages] = await Promise.all([getAllPosts(), getAllPages()]);

  const parts: string[] = [];
  parts.push(`# ${SITE.title}`);
  parts.push(`> ${SITE.desc}`);
  parts.push(`Site: ${origin} — Langue: fr-FR\n`);

  for (const p of posts) {
    parts.push(`\n--- ${p.title} (${origin}/${p.slug}/) ---`);
    parts.push(`Catégorie: ${p.categories.join(", ")}`);
    parts.push(`Auteur: ${p.author.name}`);
    parts.push(`Publié: ${p.date.slice(0, 10)}`);
    if (p.excerpt) parts.push(`\nRésumé: ${p.excerpt}\n`);
    parts.push(stripHtml(p.content));
  }

  for (const pg of pages) {
    parts.push(`\n--- ${pg.title} (${origin}/${pg.slug}/) ---`);
    parts.push(stripHtml(pg.content));
  }

  const body = parts.join("\n");
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=600",
    },
  });
};
