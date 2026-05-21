// Shared types for WP content, aligned with the mock-data shape so the app
// doesn't care whether content came from the real WPGraphQL endpoint or the
// local fixtures.

export interface Author {
  name: string;
  slug: string;
  avatar?: string;
}

export interface AuthorArchive extends Author {
  description?: string;
  count: number;
}

export interface FeaturedImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SEOOpenGraph {
  title: string;
  description: string;
  image?: string;
  type: "article" | "website";
}

export interface SEO {
  title: string;
  description: string;
  canonicalUrl: string;
  openGraph: SEOOpenGraph;
  jsonLd: string;
  robots?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author: Author;
  featuredImage?: FeaturedImage;
  categories: string[];
  tags: string[];
  brands?: string[];
  seo: SEO;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  count: number;
}

export interface Tag {
  slug: string;
  name: string;
  count: number;
}

export interface Brand {
  slug: string;
  name: string;
  description: string;
  logo?: string;
}

export type AffiliateMerchant =
  | "amazon"
  | "sephora"
  | "marionnaud"
  | "nocibe"
  | "other";

export interface AffiliateProduct {
  name: string;
  brand: string;
  merchant: AffiliateMerchant;
  affiliateUrl: string;
  price: string;
  image: string;
  pros: string[];
  cons: string[];
}

/**
 * Page — WordPress's `page` content type. Used for About, Contact, and
 * legal pages that don't belong in the article feed. Shape is deliberately
 * close to `Post` minus the editorial metadata (no author/date-first UI,
 * no categories/tags/brands/affiliate).
 */
export interface Page {
  id: string;
  slug: string;
  title: string;
  content: string;
  modified: string;
  seo: SEO;
}
