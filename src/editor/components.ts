/**
 * Editor definitions for the article components in src/components/content.
 * Each entry makes a component available in the editor's insert menu, with a form
 * for its props. Names must match the exports in src/components/content/index.ts
 * (`npm run check` verifies this).
 *
 *   wrapper: has content between the tags  <Box title="…">…</Box>
 *   block:   stands alone                  <Rating value={3} />
 *   inline:  sits inside a line of text    …text<Ref n={2} />
 */
import { fields } from '@keystatic/core';
import { block, inline, wrapper } from '@keystatic/core/content-components';

// Images are stored in the article's own folder and written as
// /src/content/greinar/<article>/<file>, which the components resolve (src/lib/images.ts)
const imageLocation = { directory: 'src/content/greinar', publicPath: '/src/content/greinar/' };
const articleImage = (label: string, description?: string) => fields.image({ label, description, ...imageLocation });
const requiredArticleImage = (label: string) => fields.image({ label, ...imageLocation, validation: { isRequired: true } });

const logo = articleImage('Merki (lógó)', 'Valfrjálst');

export const components = {
  Box: wrapper({
    label: 'Kassi',
    description: 'Litaður kassi utan um dæmi, spurningu, sviðsmynd eða fyrirtæki.',
    schema: {
      title: fields.text({ label: 'Titill' }),
      href: fields.text({ label: 'Tengill á titli', description: 'Valfrjálst, t.d. /greinar/inngangur' }),
      logo,
      logoAlt: fields.text({ label: 'Nafn á merki', description: 'Fyrir skjálesara, t.d. „Apple“' }),
      rating: fields.integer({ label: 'Íslenskustuðningur (1–5)', description: 'Valfrjálst', validation: { min: 1, max: 5 } }),
      tone: fields.select({
        label: 'Litur',
        options: [
          { label: 'Litur flokksins', value: 'tint' },
          { label: 'Grár', value: 'neutral' },
        ],
        defaultValue: 'tint',
      }),
      level: fields.select({
        label: 'Stig fyrirsagnar',
        options: [
          { label: 'Undirkafli (h3)', value: '3' },
          { label: 'Undir-undirkafli (h4)', value: '4' },
        ],
        defaultValue: '3',
      }),
    },
  }),

  Callout: wrapper({
    label: 'Staðan / Markmið',
    description: 'Kassi með merkimiða, t.d. „Staðan í dag“ eða „Markmið“, og lykiltölum.',
    schema: {
      label: fields.select({
        label: 'Merkimiði',
        options: [
          { label: 'Staðan í dag', value: 'Staðan í dag' },
          { label: 'Markmið', value: 'Markmið' },
        ],
        defaultValue: 'Markmið',
      }),
      title: fields.text({ label: 'Titill', description: 'Valfrjálst' }),
    },
  }),

  Stat: wrapper({
    label: 'Lykiltala',
    description: 'Stór tala eða staðreynd, oftast inni í kassa.',
    schema: {},
  }),

  PullQuote: wrapper({
    label: 'Áhersla',
    description: 'Lykilsetning dregin út úr textanum.',
    schema: {},
  }),

  Quote: wrapper({
    label: 'Tilvitnun',
    description: 'Tilvitnun í nafngreindan einstakling, með mynd.',
    schema: {
      name: fields.text({ label: 'Nafn', validation: { length: { min: 1 } } }),
      role: fields.text({ label: 'Starfsheiti' }),
      image: articleImage('Mynd af viðkomandi'),
    },
  }),

  Interview: wrapper({
    label: 'Viðtal',
    description: 'Spurningar feitletraðar, svör sem venjulegar málsgreinar.',
    schema: {
      name: fields.text({ label: 'Nafn', validation: { length: { min: 1 } } }),
      role: fields.text({ label: 'Starfsheiti' }),
      image: articleImage('Mynd af viðmælanda'),
    },
  }),

  Figure: wrapper({
    label: 'Mynd eða graf',
    description: 'Mynd með númeri og myndatexta. Myndatextinn fer í reitinn fyrir neðan.',
    schema: {
      image: requiredArticleImage('Mynd'),
      alt: fields.text({ label: 'Lýsing fyrir skjálesara', description: 'Hvað sýnir myndin? Sleppið ef myndatextinn lýsir henni.' }),
      kind: fields.select({
        label: 'Tegund',
        options: [
          { label: 'Mynd', value: 'Mynd' },
          { label: 'Tafla', value: 'Tafla' },
        ],
        defaultValue: 'Mynd',
      }),
      number: fields.text({ label: 'Númer', description: 'T.d. 1.1' }),
      title: fields.text({ label: 'Fyrirsögn fyrir ofan mynd', description: 'Valfrjálst' }),
    },
  }),

  Rating: block({
    label: 'Einkunn',
    description: 'Litað merki með einkunn af 5.',
    schema: {
      label: fields.text({ label: 'Texti á undan', defaultValue: 'Íslenskustuðningur' }),
      value: fields.integer({ label: 'Einkunn', defaultValue: 3, validation: { min: 1, max: 5, isRequired: true } }),
      max: fields.integer({ label: 'Hámark', defaultValue: 5 }),
    },
  }),

  SolutionRatings: block({
    label: 'Einkunnatafla',
    description: 'Tafla yfir fyrirtæki og lausnir með einkunnum. Gögnin eru undir „Einkunnatöflur“.',
    schema: {
      source: fields.relationship({ label: 'Einkunnatafla', collection: 'einkunnir', validation: { isRequired: true } }),
    },
  }),

  Ref: inline({
    label: 'Tilvísun í heimild',
    description: 'Númer heimildar í listanum „Heimildir“ (fyrsta = 1).',
    schema: {
      n: fields.integer({ label: 'Númer heimildar', validation: { min: 1, isRequired: true } }),
    },
  }),
};
