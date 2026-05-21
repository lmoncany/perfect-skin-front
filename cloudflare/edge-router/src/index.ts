const PAGES_ORIGIN = "https://perfect-skin-front.pages.dev";
const WORDPRESS_ORIGIN = "https://perfect-skin.fr";

function isGetLike(method: string): boolean {
  return method === "GET" || method === "HEAD";
}

async function proxy(request: Request, origin: string, hostHeader?: string): Promise<Response> {
  const incoming = new URL(request.url);
  const target = new URL(`${incoming.pathname}${incoming.search}`, origin);
  const headers = new Headers(request.headers);

  if (hostHeader) {
    headers.set("Host", hostHeader);
  } else {
    headers.delete("Host");
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!isGetLike(request.method)) {
    init.body = await request.arrayBuffer();
  }

  return fetch(target.toString(), init);
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const host = url.hostname.toLowerCase();

    if (host === "www.perfect-skin.fr") {
      return Response.redirect(`https://perfect-skin.fr${url.pathname}${url.search}`, 301);
    }

    if (host === "perfect-skin.fr") {
      return proxy(request, PAGES_ORIGIN);
    }

    if (host === "admin.perfect-skin.fr") {
      return proxy(request, WORDPRESS_ORIGIN, "perfect-skin.fr");
    }

    return new Response("Not found", { status: 404 });
  },
};
