import type { APIRoute } from "astro";

// Robots for a headless site: allow everything crawlable, point at sitemap,
// and tell bots not to waste crawl budget on the affiliate redirect endpoint.
const getRobotsTxt = (sitemapURL: URL) => `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
