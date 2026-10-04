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
- Icons: Phosphor Icons only (brand guide), regular weight; Box icons in `src/lib/icons.ts`. Scale colours (red → green) shared by Rating, Box headers and the self-assessment: `scaleColors` in `src/lib/colors.ts`.
- Editor headings are levels 2–4 (level 1 is the article title). Keystatic writes empty selects as `icon=""` / `region=""` and unchecked boxes as `done={false}`; components treat these as unset.
- Box numbering (`icon="number"`) is a CSS counter: any other element at `.prose` level (or a `.columns`) resets it. Tight 4px stacking applies only to plain boxes of the same tone at `.prose` level; other consecutive boxes get 1rem.
- A draft never breaks the build: components show a notice in drafts (`Astro.locals.articleDraft`). Links to other articles (Sjá einnig, `tengt`) quietly leave out drafts and missing targets in published articles; missing data components (Einkunnatafla) still fail a published build.
- Sources: when `slod` is empty, URLs in `texti` are linked (`sourceHtml` in `src/pages/greinar/[slug].astro`), so one source can cite several pages. All source links open in a new tab (with a hidden „(opnast í nýjum flipa)“ for screen readers). Documents cited as sources (PDFs) live in `public/skjol/` and are linked by path, e.g. `slod: /skjol/<file>.pdf`; they open in the browser, not as a download. Author `role` is optional.
- `Fv*` components (`src/components/content/fullveldi/`) are the figures and cards of `hvad-er-gervigreindarfullveldi` (article-specific; labelled "Fullveldi: …" in the editor). Its recurring "thread" (three numbered lines) has its labels, pillar names and the still-open line 3 label in `fullveldi/thread.ts`; the article's mark (empty, half and full circle) is the `circles` box icon in `src/lib/icons.ts`, drawn by `FvCircles`. Hanging numerals use the margin only at 64rem and up.
- `Disclosure` (e.g. "Hagsmunir") renders nothing while empty, so it can sit in an article before its text exists.
- The self-assessment (`SelfAssessment.astro`, text in `src/data/sjalfsmat.ts`) is also the page `/sjalfsmat`, which follows the EU AI Act article's draft status (noindex + left out of the sitemap in `astro.config.mjs`).
- Design tokens in `src/styles/tokens.css` come from the Figma design system ("Vefskýrsla Sept"). Figma exports live in `design/` (git-ignored).
- Markdown is processed by Sätteri (Astro 7 default), configured in `astro.config.mjs`.
- Text is Icelandic: keep `lang="is"`, „…“ quotes, and don't "fix" content wording without asking.
