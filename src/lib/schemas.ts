/**
 * Shared schema.org JSON-LD builders.
 *
 * We emit:
 *   - Organization + WebSite on every page (site-wide, via Layout)
 *   - BreadcrumbList per article/page (added by ArticleLayout/PageLayout)
 *   - Article schema on post pages (RankMath also emits its own via the SEO
 *     field; we merge ours with fields RM typically omits like wordCount +
 *     articleSection)
 *
 * Each function returns a plain object so the caller can stringify once in
 * SEOHead. Keep schemas minimal — more fields increase JSON-LD weight
 * without proportional ranking value.
 */

import { SITE } from "@/config";
import type { Post } from "./types";

const origin = SITE.website.replace(/\/$/, "");

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${origin}/#organization`,
    name: SITE.orgName,
    url: origin,
    email: SITE.orgEmail,
    sameAs: SITE.orgSameAs,
    description: SITE.desc,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: origin,
    name: SITE.title,
    description: SITE.desc,
    inLanguage: "fr-FR",
    publisher: { "@id": `${origin}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${origin}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; item?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.item ? { item: c.item } : {}),
    })),
  };
}

export function articleSchema(
  post: Post,
  wordCount: number,
  readingMinutes: number
) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": post.seo.canonicalUrl,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url
      ? [post.featuredImage.url]
      : undefined,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: `${origin}/auteur/${post.author.slug}/`,
    },
    publisher: { "@id": `${origin}/#organization` },
    wordCount,
    timeRequired: `PT${readingMinutes}M`,
    articleSection: post.categories[0]
      ? post.categories[0].replace(/-/g, " ")
      : undefined,
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
  };
}
