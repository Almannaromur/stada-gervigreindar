/**
 * Editor definitions for the article components in src/components/content.
 * Each entry makes a component available in the editor's insert menu, with a form
 * for its props. Names must match the exports in src/components/content/index.ts
 * (`npm run check` verifies this).
 *
 *   wrapper:   has content between the tags  <Box title="…">…</Box>
 *   block:     stands alone                  <Rating value={3} />
 *   inline:    sits inside a line of text    …text<Ref n={2} />
 *   repeating: holds only the listed components  <Timeline><TimelineItem …>…</TimelineItem></Timeline>
 *
 * `forSpecificLocations: true` keeps a component out of the insert menu, so it can
 * only be added inside the repeating component that lists it (its "Insert" button).
 */
import { fields } from '@keystatic/core';
import { block, inline, repeating, wrapper } from '@keystatic/core/content-components';
import { boxIcons } from '../lib/icons';
import { fvFigures } from '../components/content/fullveldi/figures';
import { pillars, threadLines } from '../components/content/fullveldi/thread';

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
      icon: fields.select({
        label: 'Tákn',
        description:
          'Valfrjálst. Birtist við hlið titilsins. „Númer“ tölusetur kassa sem koma hver á eftir öðrum (1, 2, 3…) sjálfkrafa. Fleiri tákn má bæta við í src/lib/icons.ts.',
        options: [
          { label: 'Ekkert', value: '' },
          { label: 'Númer (1, 2, 3…)', value: 'number' },
          ...Object.entries(boxIcons).map(([value, { label }]) => ({ label, value })),
        ],
        defaultValue: '',
      }),
      chip: fields.text({ label: 'Merki', description: 'Valfrjálst. Lítill miði, t.d. dagsetning eða staða („Í vinnslu“).' }),
      tone: fields.select({
        label: 'Litur',
        description: 'Litaður haus hentar t.d. fyrir áhættuflokka: titill og merki fara þá í hausinn.',
        options: [
          { label: 'Litur flokksins', value: 'tint' },
          { label: 'Grár', value: 'neutral' },
          { label: 'Rammi (enginn bakgrunnur)', value: 'outline' },
          { label: 'Haus í lit flokksins', value: 'head' },
          { label: 'Rauður haus', value: 'red' },
          { label: 'Appelsínugulur haus', value: 'orange' },
          { label: 'Gulur haus', value: 'yellow' },
          { label: 'Grænn haus', value: 'green' },
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
    description:
      'Stór tala eða staðreynd. Inni í kassa: skrifið allan textann í reitinn. Ein og sér: setjið töluna í „Tala“ og skýringuna í reitinn; þá fær hún eigin kassa.',
    schema: {
      value: fields.text({ label: 'Tala', description: 'Valfrjálst. Birtist stór, t.d. 2.079' }),
      note: fields.text({ label: 'Heimild eða skýring', description: 'Valfrjálst. Smátt letur undir textanum' }),
    },
  }),

  PullQuote: wrapper({
    label: 'Áhersla',
    description: 'Lykilsetning dregin út úr textanum.',
    schema: {},
  }),

  Quote: wrapper({
    label: 'Tilvitnun',
    description: 'Tilvitnun í nafngreindan einstakling, með eða án myndar.',
    schema: {
      name: fields.text({ label: 'Nafn', description: 'Valfrjálst ef ljóst er af samhenginu hver talar' }),
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

  Lead: wrapper({
    label: 'Inngangur',
    description: 'Upphafsmálsgrein greinarinnar, í stærra letri.',
    schema: {},
  }),

  Question: wrapper({
    label: 'Spurning',
    description: 'Spurning í viðtali sem fléttast inn í greinina. Svarið kemur á eftir sem venjulegur texti.',
    schema: {},
  }),

  Note: wrapper({
    label: 'Smáletur',
    description: 'Smátt, grátt letur, t.d. fyrirvari eða athugasemd.',
    schema: {},
  }),

  Disclosure: wrapper({
    label: 'Hagsmunir (fyrirvari)',
    description: 'Stutt málsgrein með merkimiða milli titils og texta, t.d. um hagsmuni höfundar. Sést ekki á meðan hún er tóm.',
    schema: {
      label: fields.text({ label: 'Merkimiði', defaultValue: 'Hagsmunir' }),
    },
  }),

  Steps: wrapper({
    label: 'Skref',
    description: 'Tölusett skref með stórum tölum. Skrifið venjulegan tölusettan lista, með feitletraða fyrstu línu í hverjum lið.',
    schema: {},
  }),

  Columns: repeating({
    label: 'Dálkar',
    description: 'Kassar hlið við hlið: tveir eða þrír dálkar, einn í síma. Bætið við kassa með „Insert“.',
    children: ['Box'],
    validation: { children: { min: 2 } },
    schema: {
      columns: fields.select({
        label: 'Fjöldi dálka',
        options: [
          { label: '2 dálkar', value: '2' },
          { label: '3 dálkar', value: '3' },
        ],
        defaultValue: '2',
      }),
    },
  }),

  BarChart: repeating({
    label: 'Súlurit',
    description: 'Láréttar súlur með tölum. Bætið við súlu með „Insert“.',
    children: ['Bar'],
    validation: { children: { min: 1 } },
    schema: {
      title: fields.text({ label: 'Fyrirsögn' }),
      caption: fields.text({ label: 'Skýring og heimild', description: 'Birtist undir súlunum', multiline: true }),
      max: fields.number({ label: 'Hámark', description: 'Gildi sem fyllir heila súlu', defaultValue: 100 }),
      unit: fields.text({ label: 'Eining', description: 'Birtist á eftir tölunni, t.d. %', defaultValue: '%' }),
    },
  }),

  Bar: block({
    label: 'Súla',
    forSpecificLocations: true,
    schema: {
      label: fields.text({ label: 'Heiti', description: 'T.d. ártal', validation: { length: { min: 1 } } }),
      value: fields.number({ label: 'Gildi', validation: { isRequired: true } }),
    },
  }),

  Timeline: repeating({
    label: 'Tímalína',
    description: 'Atburðir í tímaröð. Bætið við atburði eða „Í dag“-línu með „Insert“.',
    children: ['TimelineItem', 'TimelineToday'],
    validation: { children: { min: 1 } },
    schema: {
      pastLabel: fields.text({
        label: 'Fyrirsögn fyrir liðna atburði',
        description: 'Birtist efst ef tímalínan hefur „Í dag“-línu',
        defaultValue: 'Þegar í gildi',
      }),
    },
  }),

  TimelineItem: wrapper({
    label: 'Atburður',
    description: 'Nánari lýsing fer í reitinn fyrir neðan.',
    forSpecificLocations: true,
    schema: {
      date: fields.text({ label: 'Dagsetning', description: 'T.d. 2. ágúst 2026 eða Haust 2027', validation: { length: { min: 1 } } }),
      region: fields.select({
        label: 'Merki',
        options: [
          { label: 'Ekkert', value: '' },
          { label: 'ESB', value: 'ESB' },
          { label: 'Ísland', value: 'Ísland' },
        ],
        defaultValue: '',
      }),
      title: fields.text({ label: 'Titill', validation: { length: { min: 1 } } }),
      done: fields.checkbox({ label: 'Liðið', description: 'Merkt með haki' }),
      affects: fields.text({ label: 'Snertir', description: 'Valfrjálst. Aðskilið með kommu, t.d. Þróunaraðila, Notendur' }),
      shift: fields.text({
        label: 'Breyting á dagsetningu',
        description: 'Valfrjálst. Texti milli ~~ ~~ er yfirstrikaður, t.d. Átti að gilda frá ~~2. ágúst 2026~~.',
        multiline: true,
      }),
    },
  }),

  Collapsible: wrapper({
    label: 'Fellikassi',
    description:
      'Kassi sem opnast við smell, t.d. fyrir aukaefni eða langan lista. Tölusettur listi inni í honum fær stórar tölur; skáletur strax á eftir feitletruðu heiti birtist smátt og grátt.',
    schema: {
      label: fields.text({ label: 'Merkimiði', description: 'Smátt fyrir ofan titilinn', defaultValue: 'Aukaefni' }),
      title: fields.text({ label: 'Titill', validation: { length: { min: 1 } } }),
    },
  }),

  Pillars: block({
    label: 'Stoðir og þverlæg skilyrði',
    description: 'Skýringarmynd: stoðir (lóðréttar) með lögum sem liggja þvert yfir þær. Listar aðskildir með kommu.',
    schema: {
      pillarsLabel: fields.text({ label: 'Heiti stoða', description: 'T.d. Þrjár stoðir', defaultValue: 'Stoðir' }),
      pillars: fields.text({ label: 'Stoðir', description: 'Aðskildar með kommu, t.d. Gögn, Færni, Reiknigeta', validation: { length: { min: 1 } } }),
      layersLabel: fields.text({ label: 'Heiti laga', description: 'T.d. Fimm þverlæg skilyrði', defaultValue: 'Þverlæg skilyrði' }),
      layers: fields.text({ label: 'Lög', description: 'Aðskilin með kommu, t.d. Hýsing, Líkön, Staðlar', validation: { length: { min: 1 } } }),
      caption: fields.text({ label: 'Skýring', description: 'Valfrjálst. Smátt letur undir myndinni', multiline: true }),
    },
  }),

  SeeAlso: block({
    label: 'Sjá einnig',
    description: 'Tengill á aðra grein eða flokk. Veljið annað hvort. Tengill á grein í drögum birtist þegar hún er birt.',
    schema: {
      article: fields.relationship({ label: 'Grein', collection: 'greinar' }),
      category: fields.relationship({ label: 'Eða flokkur', collection: 'flokkar' }),
      label: fields.text({ label: 'Texti tengils', description: 'Valfrjálst. Annars titill greinarinnar eða heiti flokksins' }),
    },
  }),

  SelfAssessment: block({
    label: 'Sjálfsmat (EU AI Act)',
    description: 'Gagnvirkt sjálfsmat: í hvaða áhættuflokk fellur gervigreindarkerfi? Spurningunum er breytt í src/data/sjalfsmat.ts. Einnig á sinni eigin síðu, /sjalfsmat.',
    schema: {},
  }),

  TimelineToday: block({
    label: '„Í dag“-lína',
    forSpecificLocations: true,
    schema: {
      label: fields.text({ label: 'Texti', description: 'T.d. Í dag · september 2026', defaultValue: 'Í dag' }),
      nextLabel: fields.text({ label: 'Fyrirsögn fyrir komandi atburði', defaultValue: 'Framundan' }),
    },
  }),

  // For "Hvað er gervigreindarfullveldi?"
  FvFigure: block({
    label: 'Fullveldi: skýringarmynd',
    description: 'Skýringarmyndir greinarinnar „Hvað er gervigreindarfullveldi?“. Veljið mynd.',
    schema: {
      figure: fields.select({
        label: 'Mynd',
        options: Object.entries(fvFigures).map(([value, label]) => ({ label, value })),
        defaultValue: 'stations',
      }),
    },
  }),

  FvCard: wrapper({
    label: 'Fullveldi: spjald',
    description: 'Spjald með fyrirsögn undir línu, með merki greinarinnar við hlið eða smáum miða fyrir ofan.',
    schema: {
      title: fields.text({ label: 'Fyrirsögn', validation: { length: { min: 1 } } }),
      kicker: fields.text({ label: 'Miði', description: 'Valfrjálst. Smátt fyrir ofan fyrirsögnina, t.d. land' }),
      mark: fields.select({
        label: 'Merki',
        options: [
          { label: 'Ekkert', value: '' },
          { label: 'Hringir: staðsetning', value: 'stadsetning' },
          { label: 'Hringir: aðgangur', value: 'adgangur' },
          { label: 'Kassi í kassa: samningur og lög', value: 'samningur' },
        ],
        defaultValue: '',
      }),
      icon: fields.select({
        label: 'Tákn',
        description: 'Valfrjálst, ef ekkert merki er valið. Birtist í sama dálki og merkin.',
        options: [{ label: 'Ekkert', value: '' }, ...Object.entries(boxIcons).map(([value, { label }]) => ({ label, value }))],
        defaultValue: '',
      }),
      level: fields.select({
        label: 'Stig fyrirsagnar',
        description: 'Undir-undirkafli þegar spjaldið er undir millifyrirsögn (h3)',
        options: [
          { label: 'Undirkafli (h3)', value: '3' },
          { label: 'Undir-undirkafli (h4)', value: '4' },
        ],
        defaultValue: '3',
      }),
    },
  }),

  FvFrame: wrapper({
    label: 'Fullveldi: rammi',
    description: 'Rammi utan um annað efni, með heiti fyrir ofan og texta á hverri hlið.',
    schema: {
      label: fields.text({ label: 'Heiti', validation: { length: { min: 1 } } }),
      edges: fields.text({ label: 'Textar á hliðum', description: 'Fjórir, aðskildir með kommu: efst, hægri, neðst, vinstri' }),
    },
  }),

  // The thread (three numbered lines) and the figures built on it.
  // Line labels and pillar names are in src/components/content/fullveldi/thread.ts.
  FvDefinition: block({
    label: 'Fullveldi: skilgreining',
    description: 'Vinnuskilgreiningin sett sem þráðurinn: inngangsorð í línu fyrir sig, síðan þrír liðir á þremur línum, tölusettir á spássíu.',
    schema: {
      lead: fields.text({ label: 'Inngangsorð', validation: { length: { min: 1 } } }),
      one: fields.text({ label: '1. liður', validation: { length: { min: 1 } } }),
      two: fields.text({ label: '2. liður', validation: { length: { min: 1 } } }),
      three: fields.text({ label: '3. liður', validation: { length: { min: 1 } } }),
    },
  }),

  FvPillars: block({
    label: 'Fullveldi: stoðir',
    description:
      'Myndin með stoðunum þremur og þráðunum þvert yfir þær, með hnút á hverjum krossi. Smellt er á hnút til að sjá dæmi. Á meðan dæmi vantar sýna drög „Dæmi kemur hér“; í birtri grein er hnútur án dæmis ekki smellanlegur.',
    schema: Object.fromEntries(
      threadLines.flatMap((line, i) =>
        pillars.map((pillar, j) => [`e${i + 1}${j + 1}`, fields.text({ label: `Dæmi: ${i + 1} ${line} × ${pillar}`, description: 'Valfrjálst. Birtist þegar smellt er á hnútinn' })]),
      ),
    ),
  }),

  FvAssessment: block({
    label: 'Fullveldi: matsspjald',
    description: 'Spurningarnar þrjár sem lesandinn merkir við (liggur ekki fyrir, að hluta, liggur fyrir). Valið vistast aðeins í vafra lesandans.',
    schema: {
      q1: fields.text({ label: '1. spurning', validation: { length: { min: 1 } } }),
      g1: fields.text({ label: '1. skýring', description: 'Ein setning undir spurningunni' }),
      q2: fields.text({ label: '2. spurning', validation: { length: { min: 1 } } }),
      g2: fields.text({ label: '2. skýring' }),
      q3: fields.text({ label: '3. spurning', validation: { length: { min: 1 } } }),
      g3: fields.text({ label: '3. skýring' }),
    },
  }),

  FvNum: inline({
    label: 'Fullveldi: númer þráðar',
    description: 'Númer þráðar (1–3) á spássíu, sett fremst í setninguna sem það á við.',
    schema: {
      n: fields.integer({ label: 'Þráður', validation: { min: 1, max: 3, isRequired: true } }),
    },
  }),

  FvEnd: inline({
    label: 'Fullveldi: lokamerki',
    description: 'Merki greinarinnar, einu sinni, á eftir síðasta orðinu.',
    schema: {},
  }),

  FvProgress: block({
    label: 'Fullveldi: framvinda',
    description:
      'Stöðvar sem fylgja köflunum við lestur (á breiðum skjá á spássíu; annars ein lína undir titli). Hver stöð tengist fyrstu fyrirsögn sem hefst á heiti hennar. Setjið fremst í greinina.',
    schema: {
      stations: fields.text({ label: 'Stöðvar', description: 'Aðskildar með kommu', defaultValue: 'Inngangur, Hvað, Til hvers, Hvar, Hvernig, Lokaorð' }),
    },
  }),

  FvSeries: block({
    label: 'Fullveldi: greinaröð',
    description: 'Röð greinanna í lok „Lokaorða“. Grein sem er ekki valin eða ekki birt er merkt „Væntanleg“ og án tengils.',
    schema: {
      gogn: fields.relationship({ label: pillars[0], collection: 'greinar' }),
      faerni: fields.relationship({ label: pillars[1], collection: 'greinar' }),
      reiknigeta: fields.relationship({ label: pillars[2], collection: 'greinar' }),
      stada: fields.relationship({ label: 'Staða Íslands og samanburður við önnur ríki', collection: 'greinar' }),
    },
  }),
};
