import type { APIRoute } from "astro";

// Server endpoint for the WP → Cloudflare Pages deploy webhook.
export const prerender = false;

/**
 * WordPress publishes/updates a post → WP Webhooks POSTs here with
 * `{ slug, paths?: string[] }` → we trigger the Cloudflare Pages deploy hook.
 * Protected by a shared secret matching REVALIDATE_SECRET.
 *
 * Cloudflare Pages does not offer Vercel-style ISR. A deploy hook rebuilds
 * the whole frontend, which is the right trade-off for a content site where
 * publish frequency is lower than page view frequency.
 */
export const POST: APIRoute = async ({ request }) => {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = import.meta.env.REVALIDATE_SECRET;
  const deployHook = import.meta.env.CLOUDFLARE_PAGES_DEPLOY_HOOK_URL;

  if (!expected || secret !== expected) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!deployHook) {
    return new Response("Deploy hook is not configured", { status: 503 });
  }

  let body: { slug?: string; paths?: string[] } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  let deployStatus = 0;
  let deployOk = false;
  try {
    const deployResponse = await fetch(deployHook, { method: "POST" });
    deployStatus = deployResponse.status;
    deployOk = deployResponse.ok;
  } catch (error) {
    console.error(
      JSON.stringify({
        evt: "revalidate_error",
        ts: new Date().toISOString(),
        slug: body.slug,
        paths: body.paths,
        error: error instanceof Error ? error.message : "unknown",
      })
    );
    return new Response(JSON.stringify({ ok: false, error: "deploy_hook_failed" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  // eslint-disable-next-line no-console
  console.log(
    JSON.stringify({
      evt: "revalidate_request",
      ts: new Date().toISOString(),
      slug: body.slug,
      paths: body.paths,
      deployStatus,
    })
  );

  return new Response(
    JSON.stringify({ ok: deployOk, received: body, deployStatus }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
