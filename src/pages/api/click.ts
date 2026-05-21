import type { APIRoute } from "astro";

// Server endpoint — must be rendered on-demand so we see real traffic.
export const prerender = false;

/**
 * First-party affiliate click tracker.
 *
 * Request:  GET /api/click?u=<affiliate-url>&m=<merchant>&p=<productId>&s=<postSlug>
 * Response: 302 to the affiliate URL
 *
 * Why first-party? Because third-party trackers get blocked by browsers,
 * ad blockers, and iOS privacy features. A same-origin redirect lets us
 * see click-through even when analytics fails to load.
 *
 * Logged fields go to console for now — swap in your analytics of choice
 * (Cloudflare Analytics, Plausible goal, PostHog capture, etc.).
 */

const ALLOWED_MERCHANTS = new Set([
  "amazon",
  "sephora",
  "marionnaud",
  "nocibe",
  "other",
]);

// Only allow redirects to these root domains to prevent open-redirect abuse.
const ALLOWED_HOSTS = [
  "amazon.fr",
  "amzn.to",
  "amazon.com",
  "sephora.fr",
  "marionnaud.fr",
  "nocibe.fr",
  "awin1.com", // Awin affiliate tracker domain
  "tidd.ly",   // Awin short link
];

function isAllowedUrl(raw: string): URL | null {
  try {
    const u = new URL(raw);
    if (u.protocol !== "https:" && u.protocol !== "http:") return null;
    const host = u.hostname.toLowerCase();
    if (!ALLOWED_HOSTS.some(h => host === h || host.endsWith(`.${h}`))) {
      return null;
    }
    return u;
  } catch {
    return null;
  }
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const target = url.searchParams.get("u");
  const merchant = url.searchParams.get("m") ?? "other";
  const productId = url.searchParams.get("p") ?? "";
  const postSlug = url.searchParams.get("s") ?? "";

  if (!target) return new Response("Missing target", { status: 400 });
  if (!ALLOWED_MERCHANTS.has(merchant)) {
    return new Response("Invalid merchant", { status: 400 });
  }

  const validated = isAllowedUrl(target);
  if (!validated) {
    return new Response("Target not allowed", { status: 400 });
  }

  // Log structured click event. In production, replace with a real sink.
  try {
    const referer = request.headers.get("referer") ?? "";
    const userAgent = request.headers.get("user-agent") ?? "";
    // eslint-disable-next-line no-console
    console.log(
      JSON.stringify({
        evt: "affiliate_click",
        ts: new Date().toISOString(),
        merchant,
        productId,
        postSlug,
        target: validated.href,
        referer,
        ua: userAgent.slice(0, 200),
      })
    );
  } catch {
    /* noop */
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: validated.href,
      "Cache-Control": "no-store",
    },
  });
};
