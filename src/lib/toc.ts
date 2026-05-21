/**
 * Extract a flat Table of Contents from an HTML string.
 *
 * We scan for <h2> and <h3> elements, derive slug ids from their text
 * (or use an existing id attribute if present), and return an ordered list
 * suitable for rendering as a nested TOC.
 *
 * The same function also returns a rewritten HTML string where every
 * heading has an id attribute — so the article body can be emitted with
 * `set:html` and the TOC links actually target something.
 */

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function extractToc(html: string): {
  toc: TocItem[];
  html: string;
} {
  const toc: TocItem[] = [];
  const usedIds = new Set<string>();

  const rewritten = html.replace(
    /<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi,
    (match, levelStr, attrs, inner) => {
      const level = Number(levelStr) as 2 | 3;
      const textOnly = inner.replace(/<[^>]+>/g, "").trim();
      if (!textOnly) return match;

      // Prefer an existing id attribute, else derive one.
      const idMatch = /\sid=["']([^"']+)["']/.exec(attrs || "");
      let id = idMatch?.[1];
      if (!id) {
        let base = slugify(textOnly);
        if (!base) base = `section-${toc.length + 1}`;
        id = base;
        let n = 2;
        while (usedIds.has(id)) {
          id = `${base}-${n++}`;
        }
      }
      usedIds.add(id);

      toc.push({ id, text: textOnly, level });

      // Splice the id into the opening tag if not already there.
      if (idMatch) {
        return match;
      }
      return `<h${level}${attrs ?? ""} id="${id}">${inner}</h${level}>`;
    }
  );

  return { toc, html: rewritten };
}
