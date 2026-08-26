import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  const { pathname } = context.url;

  if (pathname.startsWith("/api/")) {
    return response;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("text/html")) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
    );
  }

  return response;
});
