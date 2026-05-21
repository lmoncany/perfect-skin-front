/**
 * Rough reading-time estimate from an HTML string.
 * French reading speed: ~200–220 words per minute for adults.
 * We use 200 to bias slightly slower (more honest for long-form articles).
 */

const WORDS_PER_MINUTE = 200;

export function countWords(html: string): number {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(" ").length;
}

export function readingTime(html: string): {
  minutes: number;
  words: number;
  label: string;
} {
  const words = countWords(html);
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return {
    words,
    minutes,
    label: `${minutes} min de lecture`,
  };
}
