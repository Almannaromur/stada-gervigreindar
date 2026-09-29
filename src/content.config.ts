import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryArtwork, categoryColors } from './lib/colors';

const authors = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/authors' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string().default(''),
      image: image().optional(),
    }),
});

// One file per category: src/content/flokkar/<slug>.yaml → /flokkar/<slug>
// Artwork: public/flokkar/<art>/card.svg and hero.svg, chosen with the `art` field
const flokkar = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/flokkar' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    color: z.enum(Object.keys(categoryColors) as [keyof typeof categoryColors, ...(keyof typeof categoryColors)[]]),
    /** Which artwork set in public/flokkar/ to show (independent of the category's name and address) */
    art: z.enum(Object.keys(categoryArtwork) as [keyof typeof categoryArtwork, ...(keyof typeof categoryArtwork)[]]),
    /** Position in menus and on the homepage */
    order: z.number(),
  }),
});

// One folder per article: src/content/greinar/<slug>/index.mdx → /greinar/<slug>
const greinar = defineCollection({
  loader: glob({
    pattern: '*/index.mdx',
    base: './src/content/greinar',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    category: reference('flokkar'),
    /** Short summary: shown on category pages, in link previews and search results */
    description: z.string(),
    author: reference('authors'),
    date: z.coerce.date(),
    updated: z.coerce.date().optional().nullable(),
    /** Drafts get a page (for preview) but are left out of lists, "Næsta grein" and search engines */
    draft: z.boolean().default(false),
    /** Sources, referenced in the text with <Ref n={1} /> (1 = first in the list) */
    heimildir: z
      .array(
        z.object({
          texti: z.string(),
          slod: z.string().nullable().optional(),
        }),
      )
      .default([]),
    /** Related articles, shown under "Tengt efni" after the article */
    tengt: z.array(reference('greinar')).default([]),
  }),
});

// Data for <SolutionRatings source="…" />: src/content/einkunnir/<id>.yaml
const einkunnir = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/einkunnir' }),
  schema: z.object({
    title: z.string(),
    companies: z.array(
      z.object({
        company: z.string(),
        logo: z.string().nullable().optional(),
        items: z.array(
          z.object({
            name: z.string(),
            category: z.string().default(''),
            description: z.string(),
            rating: z.number().int().min(1).max(5),
          }),
        ),
      }),
    ),
  }),
});

export const collections = { authors, flokkar, greinar, einkunnir };
