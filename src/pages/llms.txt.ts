import type { APIRoute } from "astro";
import { SITE } from "@/config";
import {
  getAllPages,
  getAllPosts,
  getCategories,
} from "@/lib/content";

/**
 * /llms.txt — compact, LLM-friendly index of the site.
 * Follows the community proposal at https://llmstxt.org/
 *
 * AI search engines (Perplexity, ChatGPT, Claude, Google AI Overviews,
 * You.com, Kagi, etc.) are increasingly using this file to understand
 * site structure without crawling every page. We expose:
 *   - Site name + tagline
 *   - Categories, with counts
 *   - All published articles grouped by category
 *   - Static info pages
 *
 * See also: /llms-full.txt (full article text, concatenated).
 */
export const GET: APIRoute = async () => {
  const origin = SITE.website.replace(/\/$/, "");
  const [posts, pages, categories] = await Promise.all([
    getAllPosts(),
    getAllPages(),
    getCategories(),
  ]);

  const lines: string[] = [];

  lines.push(`# ${SITE.title}`);
  lines.push("");
  lines.push(`> ${SITE.desc}`);
  lines.push("");
  lines.push(
    `Perfect Skin est un magazine en ligne francophone consacré aux soins cosmétiques, au bien-être et aux rituels beauté. Chaque article est rédigé avec rigueur par une équipe éditoriale indépendante et vérifié sur la base de sources scientifiques lorsque applicable. La langue principale est le français.`
  );
  lines.push("");
  lines.push(`- Site: ${origin}`);
  lines.push(`- Langue: fr-FR`);
  lines.push(`- RSS: ${origin}/rss.xml`);
  lines.push(`- Corpus complet: ${origin}/llms-full.txt`);
  lines.push(`- Sitemap XML: ${origin}/sitemap-index.xml`);
  lines.push("");

  // Categories (the primary content grouping)
  for (const cat of categories) {
    const catPosts = posts.filter(p => p.categories.includes(cat.slug));
    if (catPosts.length === 0) continue;
    lines.push(`## ${cat.name}`);
    lines.push("");
    if (cat.description) {
      lines.push(cat.description);
      lines.push("");
    }
    for (const p of catPosts) {
      const desc = p.excerpt.replace(/\s+/g, " ").slice(0, 180);
      lines.push(`- [${p.title}](${origin}/${p.slug}/): ${desc}`);
    }
    lines.push("");
  }

  // Static info pages (about/legal/contact)
  if (pages.length > 0) {
    lines.push(`## Informations`);
    lines.push("");
    for (const pg of pages) {
      const desc = pg.seo?.description?.slice(0, 180) ?? "";
      lines.push(`- [${pg.title}](${origin}/${pg.slug}/): ${desc}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300",
    },
  });
};
