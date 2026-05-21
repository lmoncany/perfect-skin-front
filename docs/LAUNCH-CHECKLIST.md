# Perfect Skin Launch Checklist

This is the practical launch checklist for running `perfect-skin.fr` as a Cloudflare Pages frontend with WordPress as the headless backend.

## 1. Cloudflare Pages setup

1. Create a Pages project for this repo.
2. Set the production branch to `main`.
3. Use `pnpm build` as the build command.
4. Use `dist` as the build output directory.
5. Add these environment variables in Pages:
   - `WORDPRESS_API_URL`
   - `WORDPRESS_APP_PASSWORD` if WordPress is protected
   - `REVALIDATE_SECRET`
   - `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL`
   - `PUBLIC_GOOGLE_SITE_VERIFICATION` if applicable
6. Keep the frontend project on Pages and move the WordPress admin to `admin.perfect-skin.fr`.
7. Attach the custom domain `perfect-skin.fr` to the Pages project.

## 2. WordPress hookup

1. Install and activate:
   - WPGraphQL
   - WPGraphQL for Rank Math SEO
   - WPGraphQL for ACF if affiliate blocks or custom fields are used
   - A webhook plugin such as WP Webhooks
2. Make sure the GraphQL endpoint is reachable at the admin host, for example `https://admin.perfect-skin.fr/graphql`.
3. Configure the WordPress webhook to POST to:
   - `https://perfect-skin.fr/api/revalidate?secret=<REVALIDATE_SECRET>`
4. Confirm the deploy hook URL stored in `CLOUDFLARE_PAGES_DEPLOY_HOOK_URL` is valid and triggers a Pages rebuild.

## 3. SEO cutover checklist

1. Verify canonical URLs still match the final public domain.
2. Confirm `robots.txt` allows crawling and points to the sitemap.
3. Submit the sitemap to Google Search Console after the cutover.
4. Make sure article URLs, category URLs, tag URLs, and brand URLs match the WordPress slugs exactly.
5. Check that the following pages resolve with the expected slugs:
   - homepage
   - article pages
   - category archives
   - tag archives
   - brand archives
   - legal pages
   - RSS feed
6. Add any required 301 redirects in Cloudflare if an old URL changes.
7. Keep the old WordPress frontend available behind the admin host for at least 90 days as a fallback.

## 4. Post-launch checks

1. Open the homepage and a few article pages on mobile and desktop.
2. Check the sitemap and robots file live.
3. Confirm a WordPress publish event triggers a frontend rebuild.
4. Confirm affiliate click tracking still returns a 302 to the merchant.
5. Monitor Search Console for coverage or canonical errors.

