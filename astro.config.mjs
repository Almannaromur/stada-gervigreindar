// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import keystatic from '@keystatic/astro';
import { satteri } from '@astrojs/markdown-satteri';

// Drafts get a page (for preview) but must not be listed in the sitemap
const articlesDir = new URL('./src/content/greinar/', import.meta.url);
const draftPaths = fs
  .readdirSync(articlesDir)
  .filter((slug) => /^draft:\s*true\s*$/m.test(fs.readFileSync(new URL(`${slug}/index.mdx`, articlesDir), 'utf8')))
  .map((slug) => `/greinar/${slug}`);

// https://astro.build/config
export default defineConfig({
  site: 'https://stadagervigreindar.is',
  trailingSlash: 'never',
  build: { format: 'file' },
  // Pages are prerendered; only the editor (/keystatic, /api/keystatic) runs on the server
  adapter: vercel(),
  integrations: [
    mdx(),
    react(),
    keystatic(),
    sitemap({
      filter: (page) => !draftPaths.some((path) => page.replace(/\/$/, '').endsWith(path)) && !page.includes('/keystatic'),
    }),
  ],
  // Addresses from the old report site (Framer), so existing links keep working
  redirects: {
    '/inngangur': '/greinar/inngangur',
    '/kafli-1': '/greinar/stefna-og-adgerdir-islands',
    '/kafli-2': '/greinar/hagnyting-og-innleiding-a-vinnustodum',
    '/kafli-3': '/greinar/gagnaoryggi-og-abyrg-notkun',
    '/kafli-4': '/greinar/ahrif-a-storf-og-vinnumarkad',
    '/kafli-5': '/greinar/gervigreind-og-einstaklingurinn',
    '/kafli-6': '/greinar/islenska-i-erlendum-lausnum',
    '/lokaord': '/greinar/gervigreindaraedid',
  },
  markdown: {
    processor: satteri({
      features: {
        // Sources are a structured list (heimildir) with <Ref />, so footnotes are off
        gfm: { footnotes: false },
        // Icelandic uses „…“ quotes, which the text already has; don't turn "…" into English quotes
        smartPunctuation: { quotes: false },
      },
    }),
  },
});
