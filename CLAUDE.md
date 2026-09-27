## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project notes

- Content: articles in `src/content/greinar/<slug>/index.mdx` (→ /greinar/<slug>), categories in `src/content/flokkar/<slug>.yaml`, rating tables in `src/content/einkunnir/`. Schema in `src/content.config.ts`.
- Editor: Keystatic (`keystatic.config.ts`, component fields in `src/editor/components.ts`). Local storage in dev, Keystatic Cloud project `almannaromur/stada-gervigreindar` in production. Hosting: Vercel adapter; pages prerendered, only /keystatic routes on demand.
- Article MDX must stay editor-compatible: no `import` lines, no JS expressions/comments, no HTML tags, no GFM footnotes (sources are the `heimildir` frontmatter list + `<Ref n={…} />`). Components are passed globally by `src/pages/greinar/[slug].astro`.
- Image props are strings "/src/content/greinar/<slug>/<file>" (what Keystatic writes); resolve with `resolveImage` in `src/lib/images.ts`. Keystatic drops image values that don't start with `<publicPath>/<slug>/`.
- New component = `src/components/content/X.astro` + export in `index.ts` + entry in `src/editor/components.ts` (`npm run check` enforces the last two).
- Design tokens in `src/styles/tokens.css` come from the Figma design system ("Vefskýrsla Sept"). Figma exports live in `design/` (git-ignored).
- Markdown is processed by Sätteri (Astro 7 default), configured in `astro.config.mjs`.
- Text is Icelandic: keep `lang="is"`, „…“ quotes, and don't "fix" content wording without asking.
