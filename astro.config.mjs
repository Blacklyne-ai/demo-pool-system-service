// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// Pool-System-Service — STATIC build. No adapter, no SSR.
// Output: /dist with plain HTML files.
// Deploy target: Cloudflare PAGES
//   Framework preset: Astro · Build: npm run build · Output: dist
// Tailwind v3.4 via @astrojs/tailwind (v4 breaks Cloudflare Pages).
// ─────────────────────────────────────────────────────────────
export default defineConfig({
  site: 'https://demo-pool-system-service.pages.dev',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  build: {
    // CSS inline (Memory feedback_corporate_scale): kein render-blockierender
    // Stylesheet-Roundtrip; Cloudflare-Brotli macht die HTML-Größe wett
    inlineStylesheets: 'always',
  },
});
