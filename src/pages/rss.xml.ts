import rss from "@astrojs/rss";
import { SITE } from "@/config";
import { getAllPosts } from "@/lib/content";

export async function GET() {
  const posts = await getAllPosts();
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    customData: `<language>${SITE.lang}-FR</language>`,
    items: posts.map(p => ({
      link: `/${p.slug}/`,
      title: p.title,
      description: p.excerpt,
      pubDate: new Date(p.date),
      // Signals last-modified to AI crawlers and RSS readers that support dc:modified.
      customData: p.modified && p.modified !== p.date
        ? `<dc:modified xmlns:dc="http://purl.org/dc/elements/1.1/">${new Date(p.modified).toISOString()}</dc:modified>`
        : undefined,
    })),
  });
}
