# psk-front

Headless frontend for **[perfect-skin.fr](https://perfect-skin.fr/)** — a French beauty, wellness, and cosmetics magazine.

**Stack:** Astro 5 · Tailwind 4 · WPGraphQL (backend) · Cloudflare Pages (hosting)
**Goal:** Maximum SEO performance + first-class affiliate monetization.

Based on [AstroPaper](https://github.com/satnaing/astro-paper) (MIT), heavily adapted for headless WP and editorial/affiliate use.

---

## Quick start

```bash
# Install (pnpm recommended; npm works too)
pnpm install

# Dev (uses mock content — no WP connection needed)
pnpm dev

# Build + static search index
pnpm build

# Preview the build
pnpm preview
```

The dev server runs on <http://localhost:4321>. With no `WORDPRESS_API_URL` env var set, the site renders from `src/lib/mock-data.ts` fixtures (~40 French beauty posts across 5 categories, 8 with affiliate product lineups). This means you can clone + `pnpm dev` and see a fully-populated site immediately.

## Wiring up the real WordPress

1. On the WordPress side, install the following plugins:
   - [WPGraphQL](https://www.wpgraphql.com/)
   - [WPGraphQL for ACF](https://github.com/wp-graphql/wpgraphql-acf) (if using ACF for affiliate product fields)
   - [wp-graphql-rank-math](https://github.com/ashhitch/wp-graphql-rank-math) (exposes Rank Math meta/JSON-LD)
   - A webhook plugin (e.g. [WP Webhooks](https://wordpress.org/plugins/wp-webhooks/)) to trigger revalidation on publish.

2. Point the frontend at your GraphQL endpoint:

   ```bash
   cp .env.example .env
   # edit .env:
   #   WORDPRESS_API_URL=https://admin.perfect-skin.fr/graphql
   #   REVALIDATE_SECRET=$(openssl rand -hex 32)
   #   CLOUDFLARE_PAGES_DEPLOY_HOOK_URL=https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/...
   ```

3. Configure the WP webhook to POST to `https://perfect-skin.fr/api/revalidate?secret=<REVALIDATE_SECRET>` on post publish/update. That route validates the secret and triggers your Cloudflare Pages deploy hook.

## Deploying on Cloudflare Pages

1. Create a Cloudflare Pages project connected to this Git repository.
2. Use these build settings:
   - Production branch: `main`
   - Build command: `pnpm build`
   - Build output directory: `dist`
3. Set these environment variables in Cloudflare Pages:
   - `WORDPRESS_API_URL`
   - `WORDPRESS_APP_PASSWORD` if WordPress is behind Basic Auth
   - `REVALIDATE_SECRET`
   - `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL`
   - `PUBLIC_GOOGLE_SITE_VERIFICATION` if you have a Search Console tag
4. Attach `perfect-skin.fr` to the Pages project in Cloudflare DNS and keep `admin.perfect-skin.fr` pointed at WordPress.
5. Trigger one manual deploy to verify the build before flipping traffic.

## Architecture highlights

- **Content layer** — `src/lib/content.ts` is the single source of truth for page data. It transparently swaps between the live WPGraphQL endpoint and mock fixtures based on whether `WORDPRESS_API_URL` is set.
- **SEO** — each article's `<head>` is driven by Rank Math metadata pulled through GraphQL (`seo` field). Canonical, OG, Twitter, and JSON-LD all match what Rank Math would render on the native WP theme.
- **Affiliate** — `src/components/AffiliateCTA.astro` is the single CTA component. It adds `rel="sponsored nofollow"` automatically, routes clicks through a first-party `/api/click` 302 redirect for tracking, and displays the legally-required French disclosure. Product comparison tables emit `Product` + `Review` JSON-LD for rich results.
- **Performance** — Astro ships zero client JS by default. Pagefind provides static search. Cloudflare handles edge delivery and caching.
- **URL structure** — preserves existing WordPress URL shape:
  - Articles at `/{slug}/`
  - Categories at `/categorie/{slug}/`
  - Tags at `/tag/{slug}/`
  - Brands at `/marque/{slug}/`

## Project layout

```
src/
├── lib/
│   ├── content.ts       # unified content API (mock vs WP)
│   ├── wp.ts            # GraphQL fetch client
│   ├── queries.ts       # WPGraphQL query strings
│   ├── types.ts         # shared types
│   └── mock-data.ts     # dev fixtures
├── layouts/             # page shells (Base, Article, Archive)
├── components/          # UI components
│   ├── AffiliateCTA.astro
│   ├── ProductComparison.astro
│   └── SEOHead.astro
├── pages/
│   ├── index.astro                          # homepage
│   ├── [slug].astro                         # single article
│   ├── categorie/[cat]/[...page].astro      # category archive
│   ├── tag/[tag]/[...page].astro            # tag archive
│   ├── marque/[brand].astro                 # brand archive
│   ├── api/click.ts                         # affiliate click tracker (server)
│   ├── api/revalidate.ts                    # webhook from WP, triggers Pages rebuild
│   ├── rss.xml.ts
│   ├── robots.txt.ts
│   └── search.astro
├── config.ts            # SITE, affiliate disclosure, merchant labels
├── constants.ts         # nav, socials, share links
└── styles/global.css    # brand palette (rose-cream + sage)
```

## Cloudflare notes

- `wrangler.toml` is included for Pages deployment and local `wrangler pages dev`.
- `src/pages/api/revalidate.ts` posts to the Cloudflare deploy hook instead of doing Vercel-style ISR.
- If you were previously planning Vercel redirects or image optimization, move that logic into Cloudflare Pages and DNS.

## License

MIT. The original AstroPaper template is also MIT (© Sat Naing).
