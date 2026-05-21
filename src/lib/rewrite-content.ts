import { SITE } from "@/config";

const PUBLIC_ORIGIN = new URL(SITE.website).origin;

const INTERNAL_HOSTS = [
  "admin.perfect-skin.fr",
  "www.perfect-skin.fr",
  "perfect-skin.fr",
];

const INTERNAL_HREF_PATTERN = new RegExp(
  String.raw`(\bhref=(["']))(?:https?:)?\/\/(?:${INTERNAL_HOSTS
    .map(host => host.replace(/\./g, "\\."))
    .join("|")})`,
  "gi"
);

/**
 * Rewrite WordPress-generated article/page links so internal anchors keep using
 * the public frontend domain after the admin site moved to a subdomain.
 */
export function rewriteWordPressContentLinks(html: string): string {
  if (!html) return html;

  return html.replace(INTERNAL_HREF_PATTERN, `$1${PUBLIC_ORIGIN}`);
}
