import rss from "@astrojs/rss";
import { SITE } from "@/config";
import { getAllPosts } from "@/lib/content";

function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function GET() {
  const posts = await getAllPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    customData: `<language>${SITE.lang}-FR</language>`,
    items: posts
      .map(p => {
        const title = (p.title || p.slug || SITE.title).trim();
        const description =
          p.excerpt ||
          stripHtml(p.content).slice(0, 160) ||
          SITE.desc;
        const pubDate = new Date(p.date);
        if (Number.isNaN(pubDate.getTime())) return null;

        return {
          link: `/${p.slug}/`,
          title,
          description,
          pubDate,
          // Signals last-modified to AI crawlers and RSS readers that support dc:modified.
          customData:
            p.modified && p.modified !== p.date
              ? `<dc:modified xmlns:dc="http://purl.org/dc/elements/1.1/">${new Date(p.modified).toISOString()}</dc:modified>`
              : undefined,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  });
}
