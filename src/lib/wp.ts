// Minimal GraphQL fetch client for WPGraphQL.
// Kept dependency-free on purpose — we only need POST + JSON.
// Includes retry logic for flaky shared hosting (502/503/timeout).

const WP_API_URL = import.meta.env.WORDPRESS_API_URL;
const WP_APP_PASSWORD = import.meta.env.WORDPRESS_APP_PASSWORD; // optional

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 3000;

function toBase64(input: string): string {
  if (typeof btoa === "function") {
    return btoa(
      Array.from(new TextEncoder().encode(input), byte =>
        String.fromCharCode(byte)
      ).join("")
    );
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input).toString("base64");
  }
  throw new Error("No base64 encoder available in this runtime.");
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string; path?: (string | number)[] }>;
}

export class WPGraphQLError extends Error {
  constructor(
    message: string,
    public errors?: GraphQLResponse<unknown>["errors"]
  ) {
    super(message);
    this.name = "WPGraphQLError";
  }
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function wpFetch<T = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!WP_API_URL) {
    throw new WPGraphQLError(
      "WORDPRESS_API_URL is not set. Set it in .env or rely on mock data via src/lib/content.ts."
    );
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (WP_APP_PASSWORD) {
    headers.Authorization = `Basic ${toBase64(WP_APP_PASSWORD)}`;
  }

  const body = JSON.stringify({ query, variables });

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(WP_API_URL, { method: "POST", headers, body });

      // Retry on server errors (502, 503, 504)
      if (res.status >= 500 && attempt < MAX_RETRIES) {
        console.warn(
          `[WPGraphQL] ${res.status} on attempt ${attempt}/${MAX_RETRIES}, retrying in ${RETRY_DELAY_MS}ms...`
        );
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }

      if (!res.ok) {
        throw new WPGraphQLError(
          `WPGraphQL HTTP ${res.status}: ${res.statusText}`
        );
      }

      const json = (await res.json()) as GraphQLResponse<T>;
      if (json.errors && json.errors.length > 0) {
        throw new WPGraphQLError(
          `WPGraphQL errors: ${json.errors.map(e => e.message).join("; ")}`,
          json.errors
        );
      }
      if (!json.data) {
        throw new WPGraphQLError("WPGraphQL response had no data");
      }
      return json.data;
    } catch (err) {
      // Retry on network errors (timeout, connection reset)
      if (
        attempt < MAX_RETRIES &&
        err instanceof TypeError &&
        err.message.includes("fetch")
      ) {
        console.warn(
          `[WPGraphQL] Network error on attempt ${attempt}/${MAX_RETRIES}, retrying...`
        );
        await sleep(RETRY_DELAY_MS * attempt);
        continue;
      }
      throw err;
    }
  }

  throw new WPGraphQLError("WPGraphQL: max retries exceeded");
}

export function isWpConfigured(): boolean {
  return !!WP_API_URL;
}
