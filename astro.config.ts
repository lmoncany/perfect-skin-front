import { defineConfig, envField, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import { SITE } from "./src/config";

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: "always",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    sitemap({
      filter: page => !page.endsWith("/api/click"),
      i18n: undefined,
    }),
  ],
  vite: {
    // eslint-disable-next-line
    // @ts-ignore
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
    // Allow external WP + placeholder image hosts.
    domains: ["perfect-skin.fr", "picsum.photos", "secure.gravatar.com"],
    remotePatterns: [
      { protocol: "https", hostname: "**.perfect-skin.fr" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  env: {
    schema: {
      WORDPRESS_API_URL: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      WORDPRESS_APP_PASSWORD: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      REVALIDATE_SECRET: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      CLOUDFLARE_PAGES_DEPLOY_HOOK_URL: envField.string({
        access: "secret",
        context: "server",
        optional: true,
      }),
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    preserveScriptOrder: true,
    fonts: [
      {
        name: "Inter",
        cssVariable: "--font-inter",
        provider: fontProviders.google(),
        fallbacks: ["system-ui", "sans-serif"],
        weights: [400, 500, 600, 700],
        styles: ["normal"],
      },
      {
        name: "Lexend",
        cssVariable: "--font-display",
        provider: fontProviders.google(),
        fallbacks: ["system-ui", "sans-serif"],
        weights: [300, 400, 500, 600, 700],
        styles: ["normal"],
      },
      {
        name: "Josefin Sans",
        cssVariable: "--font-accent",
        provider: fontProviders.google(),
        fallbacks: ["system-ui", "sans-serif"],
        weights: [300, 400, 500, 600],
        styles: ["normal", "italic"],
      },
    ],
  },
});
