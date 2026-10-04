import { collection, config, fields, singleton } from '@keystatic/core';
import { components } from './src/editor/components';
import { categoryArtwork, categoryColors } from './src/lib/colors';

// Locally (npm run dev) the editor writes straight to the files on disk.
// On the live site editors log in through Keystatic Cloud, and every save
// becomes a commit to the GitHub repository, which triggers a new deploy.
export default config({
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: { project: 'almannaromur/stada-gervigreindar' },
  ui: {
    brand: { name: 'Staða gervigreindar' },
    navigation: {
      Efni: ['greinar'],
      Uppsetning: ['forsida', 'flokkar', 'authors', 'einkunnir'],
    },
  },

  singletons: {
    forsida: singleton({
      label: 'Forsíða',
      path: 'src/content/forsida',
      format: 'yaml',
      schema: {
        greinar: fields.array(fields.relationship({ label: 'Grein', collection: 'greinar', validation: { isRequired: true } }), {
          label: 'Greinar á forsíðu',
          description:
            'Allt að þrjár greinar undir „Nýjar greinar“, í þessari röð. Greinar í drögum birtast þegar þær eru birtar. Nýjustu greinarnar fylla í laus sæti.',
          validation: { length: { max: 3 } },
          itemLabel: (props) => props.value ?? 'Veldu grein',
        }),
      },
    }),
  },

  collections: {
    greinar: collection({
      label: 'Greinar',
      slugField: 'title',
      path: 'src/content/greinar/*/',
      entryLayout: 'content',
      format: { contentField: 'content' },
      columns: ['title', 'date'],
      previewUrl: '/greinar/{slug}',
      schema: {
        title: fields.slug({
          name: { label: 'Titill', validation: { length: { min: 1 } } },
          slug: { label: 'Slóð', description: 'Birtist sem /greinar/<slóð>. Breytið ekki eftir birtingu (ekki ýta á „Regenerate“ / ↻): tenglar á greinina hætta þá að virka.' },
        }),
        category: fields.relationship({ label: 'Flokkur', collection: 'flokkar', validation: { isRequired: true } }),
        description: fields.text({
          label: 'Útdráttur',
          description: 'Ein til tvær setningar. Birtist á flokkasíðu og þegar grein er deilt.',
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        author: fields.relationship({ label: 'Höfundur', collection: 'authors', validation: { isRequired: true } }),
        date: fields.date({ label: 'Dagsetning', defaultValue: { kind: 'today' }, validation: { isRequired: true } }),
        updated: fields.date({ label: 'Uppfært', description: 'Valfrjálst' }),
        draft: fields.checkbox({
          label: 'Drög',
          description: 'Hakið við meðan greinin er í vinnslu. Hún birtist þá ekki á vefnum nema fyrir þá sem hafa slóðina.',
          defaultValue: true,
        }),
        heimildir: fields.array(
          fields.object({
            texti: fields.text({
              label: 'Heimild',
              description:
                'T.d. Hagstofa Íslands. (2026, 10. mars). *Titill*. Stjörnur um texta gera hann skáletraðan. Ef reiturinn Slóð er tómur verða vefslóðir í textanum (https://…) að tenglum, svo ein heimild getur vísað á fleiri síður.',
              multiline: true,
              validation: { length: { min: 1 } },
            }),
            slod: fields.url({ label: 'Slóð', description: 'Valfrjálst' }),
          }),
          {
            label: 'Heimildir',
            description: 'Í textanum er vísað í heimild með „Tilvísun í heimild“ og númeri hennar hér (fyrsta = 1).',
            itemLabel: (props) => props.fields.texti.value || 'Ný heimild',
          },
        ),
        tengt: fields.array(fields.relationship({ label: 'Grein', collection: 'greinar', validation: { isRequired: true } }), {
          label: 'Tengdar greinar',
          description: 'Birtast neðst undir „Tengt efni“. Greinar í drögum birtast þegar þær eru birtar.',
          itemLabel: (props) => props.value ?? 'Veldu grein',
        }),
        content: fields.mdx({
          label: 'Texti',
          components,
          options: {
            image: false,
            divider: false,
            codeBlock: false,
            // Level 1 is the article's title; sections start at level 2
            heading: [2, 3, 4],
          },
        }),
      },
    }),

    flokkar: collection({
      label: 'Flokkar',
      slugField: 'name',
      path: 'src/content/flokkar/*',
      format: 'yaml',
      columns: ['name', 'order'],
      schema: {
        name: fields.slug({
          name: { label: 'Heiti', description: 'Óhætt að breyta. Slóðin breytist ekki við það.' },
          slug: {
            label: 'Slóð',
            description: 'Birtist sem /flokkar/<slóð>. Breytið ekki eftir birtingu (ekki ýta á „Regenerate“ / ↻): gamlir tenglar og greinar í flokknum hætta þá að virka.',
          },
        }),
        description: fields.text({ label: 'Lýsing', multiline: true }),
        color: fields.select({
          label: 'Litur',
          options: Object.keys(categoryColors).map((key) => ({ label: key, value: key })),
          defaultValue: 'army',
        }),
        art: fields.select({
          label: 'Myndskreyting',
          description: 'Mynstrið á flokkaspjaldi og efst á flokkasíðu',
          options: Object.entries(categoryArtwork).map(([value, label]) => ({ label, value })),
          defaultValue: 'skodanapistlar',
        }),
        order: fields.integer({ label: 'Röð', description: 'Staða í valmynd og á forsíðu' }),
      },
    }),

    authors: collection({
      label: 'Höfundar',
      slugField: 'name',
      path: 'src/content/authors/*',
      format: 'yaml',
      schema: {
        name: fields.slug({ name: { label: 'Nafn' } }),
        role: fields.text({ label: 'Starfsheiti' }),
        image: fields.image({ label: 'Mynd', directory: 'src/content/authors', publicPath: './' }),
      },
    }),

    einkunnir: collection({
      label: 'Einkunnatöflur',
      slugField: 'title',
      path: 'src/content/einkunnir/*',
      format: 'yaml',
      schema: {
        title: fields.slug({ name: { label: 'Heiti' } }),
        companies: fields.array(
          fields.object({
            company: fields.text({ label: 'Fyrirtæki' }),
            logo: fields.image({ label: 'Merki', directory: 'public/logos', publicPath: '/logos/' }),
            items: fields.array(
              fields.object({
                name: fields.text({ label: 'Lausn' }),
                category: fields.text({ label: 'Tegund' }),
                description: fields.text({ label: 'Lýsing', multiline: true }),
                rating: fields.integer({ label: 'Einkunn (1–5)', validation: { min: 1, max: 5, isRequired: true } }),
              }),
              { label: 'Lausnir', itemLabel: (props) => props.fields.name.value || 'Ný lausn' },
            ),
          }),
          { label: 'Fyrirtæki', itemLabel: (props) => props.fields.company.value || 'Nýtt fyrirtæki' },
        ),
      },
    }),
  },
});
