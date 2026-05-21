import type { Post } from "./types";

export const FALLBACK_POST_IMAGE = "/astropaper-og.jpg";
export const FALLBACK_POST_IMAGE_ALT = "Perfect Skin — image de couverture";
export const FALLBACK_POST_IMAGE_WIDTH = 1200;
export const FALLBACK_POST_IMAGE_HEIGHT = 675;

export function getPostImage(post: Post) {
  return {
    src: post.featuredImage?.url || FALLBACK_POST_IMAGE,
    alt: post.featuredImage?.alt || post.title || FALLBACK_POST_IMAGE_ALT,
    width: post.featuredImage?.width || FALLBACK_POST_IMAGE_WIDTH,
    height: post.featuredImage?.height || FALLBACK_POST_IMAGE_HEIGHT,
    hasImage: !!post.featuredImage?.url,
  };
}
