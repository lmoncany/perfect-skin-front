import type { APIRoute } from "astro";
import { clearContentCaches } from "@/lib/content";

// Server endpoint for the WP → frontend cache invalidation webhook.
export const prerender = false;

/**
 * WordPress publishes/updates a post → WP Webhooks POSTs here with
 * `{ slug, paths?: string[] }` → we clear the in-worker content cache.
 * Protected by a shared secret matching REVALIDATE_SECRET.
 *
 * The frontend now renders on demand, so there is no rebuild step here.
 * This endpoint is just a fast cache-busting hook so new content appears
 * without waiting for the runtime TTL.
 */
export const POST: APIRoute = async ({ request }) => {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = import.meta.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: { slug?: string; paths?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  clearContentCaches();

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      evt: "revalidate_request",
      ts: new Date().toISOString(),
      slug: body.slug,
      paths: body.paths,
      cacheCleared: true,
    })
  );

  return new Response(JSON.stringify({ ok: true, received: body, cacheCleared: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
