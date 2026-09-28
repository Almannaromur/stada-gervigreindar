# Staða gervigreindar

Source for [stadagervigreindar.is](https://stadagervigreindar.is): Almannarómur's articles on AI in Iceland, organised in categories. Built with [Astro](https://astro.build), hosted on Vercel. Content is stored as files in this repository and edited through [Keystatic](https://keystatic.com) at `/keystatic`. The design is from the Figma file "Vefskýrsla Sept".

## Running locally

```sh
npm install
npm run dev      # site: http://localhost:4321, editor: http://localhost:4321/keystatic
npm run build
npm run check    # editor/component check + type check
```

Locally, the editor writes straight to the files on disk. After creating a **new** article, restart `npm run dev` before previewing it (the dev server caches the list of article pages).

## Ritstjóri (for editors)

Go to **stadagervigreindar.is/ritstjori** (or `/admin`; both lead to `/keystatic`) and log in with your email (Keystatic Cloud).

**New article:** Greinar → *Add*.
- Fill in title, category, author, summary ("Útdráttur") and date.
- Write the text in the main area.
- New articles start as **Drög** (draft). A draft is saved to the site but not listed anywhere, so you can check it through its link (the preview button at the top). Untick *Drög* and save to publish.

**Saving** updates the live site in about a minute.

**Components:** the **+** button in the toolbar inserts:

| In the menu | What it is |
|---|---|
| Kassi | Tinted box for an example, question, scenario or company. Optional title, logo and Icelandic-support score |
| Staðan / Markmið | Box with a "Staðan í dag" or "Markmið" badge, usually holding key figures |
| Lykiltala | A key figure in large type (inside a box, or on its own) |
| Áhersla | A key sentence lifted out of the text |
| Tilvitnun | A quote from a named person, with photo |
| Viðtal | An interview: questions in **bold**, answers as paragraphs |
| Mynd eða graf | Image with number and caption. Write the caption in the block itself |
| Einkunn | Coloured score badge (1 red → 5 green) |
| Einkunnatafla | Company/product table; the data is edited under *Einkunnatöflur* |
| Tilvísun í heimild | Reference number [1], [2] … in the text |

**Sources:** add them in the *Heimildir* list (text + link) at the side of the article. Then, where the text should cite one, insert **Tilvísun í heimild** with its number in the list (first = 1). The sources appear as "Heimildaskrá" at the end of the article. `*Title*` in a source makes it italic.

**Don't** change an article's *Slóð* (address) after it has been published: links to it would break.

## Content files

```
src/content/
  greinar/<slug>/index.mdx     → /greinar/<slug>   (images sit in the same folder)
  flokkar/<slug>.yaml          → /flokkar/<slug>   (name, description, colour, artwork, order)
  authors/<slug>.yaml          name, role; photo in authors/<slug>/
  einkunnir/<slug>.yaml        data for an "Einkunnatafla" (companies, products, scores)
public/flokkar/<art>/          card.svg and hero.svg artwork sets; a category picks one with `art`
                               (list in src/lib/colors.ts), so renaming a category never breaks it
public/logos/<slug>/           logos used in an Einkunnatafla
```

The build fails with a clear message if a required field is missing, or a category, author or rating table doesn't exist.

Article files contain no `import` lines: the article page passes every component to the content. Images are referenced as `/src/content/greinar/<article>/<file>`, which is what the editor writes.

## Adding a new component

1. Create the component in `src/components/content/`, e.g. `Timeline.astro`. Use `var(--cat-base)` / `var(--cat-text)` for the category colour. Image props are strings; resolve them with `resolveImage(src, Astro.locals.articleId)` from `src/lib/images.ts`.
2. Export it from `src/components/content/index.ts`.
3. Describe its fields for the editor in `src/editor/components.ts`:
   - `wrapper` if it has content between the tags
   - `block` if it stands alone
   - `inline` if it sits inside a line of text

   Give it an Icelandic `label`, since that's what editors see in the menu.

`npm run check` fails if step 2 and step 3 don't list the same components, so a component can't be forgotten in the editor.

## Structure

```
keystatic.config.ts   editor setup: collections and their fields
src/
  editor/components.ts  editor fields for the article components
  content.config.ts     content schema used when building the site
  site.ts               site name, homepage text, footer details
  lib/                  content helpers, category colours, image lookup
  pages/                index, flokkar/[slug], greinar/[slug], 404
  layouts/              BaseLayout (html, meta, header, footer)
  components/           header, footer, cards, category sections
  components/content/   components used inside articles
  styles/               tokens.css (colours, type, spacing from Figma), global.css, prose.css
scripts/                check-editor-components.mjs
```

Old addresses from the Framer site (`/kafli-1`, `/inngangur`, …) redirect to the new article addresses (`redirects` in `astro.config.mjs`; real 301s on Vercel).

## Going live (one-off setup)

1. Push this repository to GitHub.
2. **Vercel:** *Add New Project* → import the repository. No special settings are needed; the Astro preset is detected.
3. **Keystatic Cloud** (keystatic.cloud): project `almannaromur/stada-gervigreindar`, connected to the GitHub repository. Invite editors by email there. The project name is set in `keystatic.config.ts` (`cloud.project`); no environment variables are needed.
4. Point the stadagervigreindar.is domain to Vercel (Vercel → Domains).
