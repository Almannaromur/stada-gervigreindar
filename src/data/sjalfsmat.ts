/**
 * Text of the EU AI Act self-assessment (<SelfAssessment />, also at /sjalfsmat).
 * Wording can be changed here; which question follows which, and which result is
 * shown, is decided in src/components/content/SelfAssessment.astro.
 * Written by Almannarómur, based on the Dutch government's guidance for its agencies.
 */

export interface Choice {
  value: string;
  label: string;
  /** Smaller line under the label */
  hint?: string;
}

interface StepBase {
  /** Small label above the question, e.g. "Hluti 1 af 5 · Grunnur" */
  part: string;
  /** How far along the progress bar (1–7 of 8) */
  progress: number;
  question: string;
  explanation?: string;
  /** Expandable help */
  help?: { summary: string; body: string };
  /** List shown under the question */
  criteria?: string[];
}

/** One answer button per choice */
export interface ChoiceStep extends StepBase {
  kind: 'choice';
  choices: Choice[];
}

/** Tick any number of boxes, then continue */
export interface ChecksStep extends StepBase {
  kind: 'checks';
  checks: Choice[];
  nextLabel: string;
}

export type Step = ChoiceStep | ChecksStep;

export interface ResultCard {
  /** Colour: the risk scale shared with the boxes, or grey */
  tone: 'red' | 'orange' | 'yellow' | 'green' | 'neutral';
  title?: string;
  /** Smaller heading, used instead of a title */
  subtitle?: string;
  paragraphs?: string[];
  items?: string[];
  /** Text after the list */
  after?: string[];
}

export const totalProgress = 8;

export const steps = {
  ai: {
    kind: 'choice',
    part: 'Hluti 1 af 5 · Grunnur',
    progress: 1,
    question: 'Er þetta gervigreindarkerfi í skilningi reglugerðarinnar?',
    explanation:
      'Kerfið telst gervigreindarkerfi ef það ályktar af inntaki hvernig það býr til úttak, svo sem spár, efni, ráðleggingar eða ákvarðanir, og vinnur með einhverju sjálfstæði.',
    help: {
      summary: 'Hvað fellur utan skilgreiningarinnar?',
      body: 'Hefðbundinn hugbúnaður sem fylgir aðeins föstum reglum sem menn hafa skrifað, til dæmis töflureiknisformúlur, einföld sjálfvirkni og hefðbundnar gagnagrunnsfyrirspurnir. Vafamál ber að meta með sérfræðingi.',
    },
    choices: [
      { value: 'yes', label: 'Já', hint: 'Kerfið byggir á vélnámi eða ályktar sjálft af gögnum' },
      { value: 'no', label: 'Nei', hint: 'Fastar, handskrifaðar reglur eingöngu' },
    ],
  },
  scope: {
    kind: 'choice',
    part: 'Hluti 1 af 5 · Grunnur',
    progress: 2,
    question: 'Á eitthvað af eftirfarandi við um kerfið?',
    criteria: [
      'Það er eingöngu þróað eða notað í hernaðar-, varnar- eða þjóðaröryggisskyni',
      'Það er enn á rannsóknar- og þróunarstigi og hefur ekki verið sett á markað eða tekið í notkun',
      'Það er eingöngu notað af einstaklingi í persónulegum tilgangi, utan atvinnustarfsemi',
    ],
    choices: [
      { value: 'yes', label: 'Já, eitthvað af þessu á við' },
      { value: 'no', label: 'Nei, ekkert af þessu á við' },
    ],
  },
  market: {
    kind: 'choice',
    part: 'Hluti 1 af 5 · Grunnur',
    progress: 3,
    question: 'Tengist kerfið ESB-markaði?',
    explanation:
      'Reglugerðin gildir um kerfi sem sett eru á markað eða notuð innan ESB og einnig þegar úttak kerfis er notað þar, óháð staðsetningu fyrirtækisins.',
    choices: [
      { value: 'eu', label: 'Já', hint: 'Kerfið er boðið eða notað innan ESB, eða úttak þess notað þar' },
      { value: 'is', label: 'Nei, eingöngu innanlands á Íslandi', hint: 'Reglurnar taka þá gildi með íslensku innleiðingunni' },
    ],
  },
  role: {
    kind: 'choice',
    part: 'Hluti 2 af 5 · Hlutverk',
    progress: 4,
    question: 'Hvert er hlutverk þitt gagnvart kerfinu?',
    help: {
      summary: 'Getur hlutverkið breyst?',
      body: 'Já. Notandi sem breytir kerfi verulega, notar það í öðrum tilgangi en það var ætlað á áhættusviði eða markaðssetur það undir eigin vörumerki getur tekið á sig skyldur þróunaraðila.',
    },
    choices: [
      { value: 'provider', label: 'Við þróum kerfið', hint: 'Eða látum þróa það og bjóðum undir eigin nafni' },
      { value: 'deployer', label: 'Við notum kerfi frá öðrum', hint: 'Í starfsemi fyrirtækis eða stofnunar' },
      { value: 'importer', label: 'Við flytjum inn eða dreifum kerfi annarra' },
    ],
  },
  banned: {
    kind: 'choice',
    part: 'Hluti 3 af 5 · Bönnuð notkun',
    progress: 5,
    question: 'Gerir kerfið eitthvað af eftirfarandi, eða er það notað til þess?',
    criteria: [
      'Félagsleg einkunnagjöf: hegðun fólks metin til stiga sem ráða aðgangi þess að þjónustu eða tækifærum',
      'Dulin hegðunarstýring eða misnotkun á varnarleysi fólks, til dæmis barna eða fatlaðs fólks',
      'Rauntímaandlitsgreining á almannafæri í þágu löggæslu, utan þröngra undantekninga',
      'Tilfinningagreining starfsfólks á vinnustað eða nemenda í skóla',
      'Ómarkviss söfnun andlitsmynda af netinu eða úr eftirlitsmyndavélum í andlitsgreiningargrunna',
      'Forspárlöggæsla: mat á líkum þess að einstaklingur fremji afbrot, byggt á persónusniði',
      'Gerð kynferðislegs myndefnis af fólki án samþykkis eða kynferðislegs ofbeldisefnis gegn börnum (bann frá 2. desember 2026)',
    ],
    choices: [
      { value: 'yes', label: 'Já' },
      { value: 'no', label: 'Nei, ekkert af þessu á við' },
    ],
  },
  product: {
    kind: 'choice',
    part: 'Hluti 4 af 5 · Áhættusöm kerfi',
    progress: 6,
    question: 'Er kerfið hluti af vöru sem fellur undir vörulöggjöf ESB?',
    explanation: 'Til dæmis öryggishluti í lækningatæki, ökutæki, vél, lyftu eða leikfangi, eða sjálft slík vara.',
    choices: [
      { value: 'yes', label: 'Já' },
      { value: 'no', label: 'Nei' },
    ],
  },
  areas: {
    kind: 'checks',
    part: 'Hluti 4 af 5 · Áhættusöm kerfi',
    progress: 6,
    question: 'Er kerfið notað á einhverju þessara sviða?',
    explanation: 'Merktu við allt sem á við, eða haltu áfram ef ekkert á við.',
    checks: [
      { value: 'bio', label: 'Lífkenni: fjargreining, flokkun eftir viðkvæmum þáttum eða tilfinningagreining, þar sem hún er heimil' },
      { value: 'infra', label: 'Mikilvægir innviðir: kerfi sem stýra eða vakta öryggi í rekstri veitu-, orku- eða samgöngukerfa' },
      { value: 'edu', label: 'Menntun: námsmat, inntaka í skóla eða eftirlit með prófum' },
      { value: 'work', label: 'Ráðningar og starfsmannamál: síun umsókna, frammistöðumat eða ákvarðanir um framgang' },
      {
        value: 'serv',
        label: 'Bætur og nauðsynleg þjónusta: mat á bótarétti, lánshæfismat einstaklinga, áhættumat trygginga eða forgangsröðun neyðarsímtala',
      },
      { value: 'law', label: 'Löggæsla: mat á sönnunargögnum, áhættumat einstaklinga eða sambærileg notkun' },
      { value: 'mig', label: 'Útlendinga- og landamæramál: mat umsókna eða áhættumat á landamærum' },
      { value: 'just', label: 'Réttarkerfi og lýðræðisleg ferli: aðstoð við dómsúrlausnir eða kerfi ætluð til að hafa áhrif á kosningar' },
    ],
    nextLabel: 'Áfram',
  },
  impact: {
    kind: 'choice',
    part: 'Hluti 4 af 5 · Áhættusöm kerfi',
    progress: 6,
    question: 'Hefur kerfið veruleg áhrif á ákvarðanir um fólk?',
    explanation:
      'Kerfi á áhættusviði telst ekki áhættusamt ef það sinnir aðeins afmörkuðu undirbúnings- eða aðstoðarverkefni og hefur ekki veruleg áhrif á ákvarðanir sem varða fólk. Kerfi sem gera persónusnið af einstaklingum teljast þó alltaf áhættusöm.',
    help: {
      summary: 'Dæmi um muninn',
      body: 'Kerfi sem raðar umsóknum í stafrófsröð eða dregur saman texta fyrir mannlegan matsmann sinnir aðstoðarverkefni. Kerfi sem stigar eða síar umsækjendur hefur veruleg áhrif á ákvörðunina.',
    },
    choices: [
      { value: 'yes', label: 'Já, kerfið hefur veruleg áhrif', hint: 'Eða gerir persónusnið af fólki' },
      { value: 'no', label: 'Nei, aðeins afmarkað aðstoðarverkefni' },
    ],
  },
  transparency: {
    kind: 'checks',
    part: 'Hluti 5 af 5 · Gagnsæi',
    progress: 7,
    question: 'Á eitthvað af eftirfarandi við um kerfið?',
    explanation: 'Merktu við allt sem á við, eða haltu áfram ef ekkert á við.',
    checks: [
      { value: 'chat', label: 'Fólk á í beinum samskiptum við kerfið, til dæmis spjallmenni eða raddaðstoð' },
      { value: 'gen', label: 'Kerfið býr til texta, myndir, hljóð eða myndbönd' },
      { value: 'deep', label: 'Kerfið býr til eða breytir efni sem líkir eftir raunverulegu fólki, stöðum eða atburðum (djúpfalsanir)' },
      { value: 'emo', label: 'Kerfið greinir tilfinningar eða flokkar fólk eftir lífkennum, þar sem það er heimilt' },
    ],
    nextLabel: 'Sjá niðurstöðu',
  },
  gpai: {
    kind: 'choice',
    part: 'Viðbót · Almenn líkön',
    progress: 7,
    question: 'Bjóðið þið almennt gervigreindarlíkan?',
    explanation:
      'Það er grunnlíkan sem ræður við fjölbreytt verkefni og aðrir geta byggt kerfi ofan á, ekki tilbúin lausn fyrir afmarkað verkefni.',
    choices: [
      { value: 'yes', label: 'Já' },
      { value: 'no', label: 'Nei' },
    ],
  },
} satisfies Record<string, Step>;

export type StepId = keyof typeof steps;

const fineHigh = 'Brot varða sektum allt að 15 milljónum evra eða 3% af árlegri heildarveltu á heimsvísu.';

export const results = {
  notAI: {
    tone: 'neutral',
    title: 'Reglugerðin á líklega ekki við',
    paragraphs: [
      'Kerfið uppfyllir ekki skilgreiningu reglugerðarinnar á gervigreindarkerfi. Almenn löggjöf gildir áfram um notkun þess, til dæmis persónuverndarlög.',
      'Ef vafi leikur á skilgreiningunni er rétt að fá mat sérfræðings; mörkin geta verið matskennd.',
    ],
  },
  outOfScope: {
    tone: 'neutral',
    title: 'Notkunin fellur utan gildissviðs reglugerðarinnar',
    paragraphs: [
      'Reglugerðin nær ekki til hernaðar- og þjóðaröryggisnota, kerfa á rannsóknar- og þróunarstigi fyrir markaðssetningu eða persónulegrar notkunar einstaklinga.',
      'Athugaðu að um leið og kerfi fer úr þróun á markað eða í notkun gilda reglurnar; skynsamlegt er að hanna með kröfurnar í huga frá upphafi.',
    ],
  },
  banned: {
    tone: 'red',
    title: 'Líklega bönnuð notkun',
    paragraphs: [
      'Notkun af þessu tagi er óheimil innan ESB, sama hver á í hlut. Brot varða hæstu sektum reglugerðarinnar, allt að 35 milljónum evra eða 7% af árlegri heildarveltu fyrirtækis á heimsvísu, hvort sem er hærra.',
      'Slík kerfi ætti hvorki að þróa né taka í notkun. Leitaðu lögfræðiráðgjafar ef þú telur að undantekning geti átt við.',
    ],
  },
  highRiskProduct: {
    tone: 'orange',
    title: 'Líklega áhættusamt kerfi (innbyggt í vöru)',
    paragraphs: [
      'Kerfið fellur að líkindum undir kröfur um áhættusöm kerfi sem eru hluti af vörum. Þær taka gildi innan ESB 2. ágúst 2028 og fléttast saman við gildandi vörulöggjöf, til dæmis um lækningatæki.',
    ],
  },
  highRisk: {
    tone: 'orange',
    title: 'Líklega áhættusamt kerfi',
    paragraphs: [
      'Kerfið er notað á sviði sem reglugerðin skilgreinir sem áhættusamt og virðist hafa veruleg áhrif á ákvarðanir um fólk. Kröfurnar taka gildi innan ESB 2. desember 2027.',
    ],
  },
  exempt: {
    tone: 'yellow',
    title: 'Á áhættusviði, en líklega undanþegið',
    paragraphs: [
      'Kerfið starfar á skilgreindu áhættusviði en virðist aðeins sinna afmörkuðu aðstoðarverkefni án verulegra áhrifa á ákvarðanir. Slík kerfi teljast ekki áhættusöm, en matið þarf að skjalfesta og endurskoða ef hlutverk kerfisins breytist.',
      'Athugið: geri kerfið persónusnið af einstaklingum gildir undanþágan ekki.',
    ],
  },
  minimal: {
    tone: 'green',
    title: 'Líklega lágmarksáhætta',
    paragraphs: [
      'Reglugerðin leggur engar nýjar sérkröfur á kerfið. Almenn löggjöf gildir áfram, til dæmis persónuverndarlög, og krafan um gervigreindarlæsi starfsfólks nær til allrar notkunar gervigreindar í rekstri.',
    ],
  },
  gpai: {
    tone: 'orange',
    title: 'Skyldur framleiðenda almennra líkana',
    paragraphs: [
      'Til viðbótar gilda sérreglur um almenn líkön: tækniskjölun, upplýsingar til þeirra sem byggja á líkaninu, stefna um höfundarétt og samantekt um þjálfunargögn. Strangari kröfur gilda um öflugustu líkönin. Skyldurnar hafa gilt frá ágúst 2025 og gervigreindarskrifstofa ESB fylgir þeim eftir.',
    ],
  },
  nextSteps: {
    tone: 'neutral',
    subtitle: 'Næstu skref',
    items: [
      'Skjalfestu matið og forsendur þess; það er fyrsta spurning eftirlitsaðila.',
      'Berðu niðurstöðuna saman við sjálfsmatstól framkvæmdastjórnarinnar og leitaðu ráðgjafar um áhættusöm kerfi.',
      'Tryggðu gervigreindarlæsi starfsfólks sem vinnur með kerfið; sú krafa gildir óháð flokki.',
    ],
  },
} satisfies Record<string, ResultCard>;

/** Obligations added to a high-risk result, by role */
export const obligations = {
  provider: {
    subtitle: 'Helstu skyldur þróunaraðila',
    items: [
      'Meta og milda áhættu kerfisins með skipulögðum hætti allan líftíma þess',
      'Tryggja gæði þjálfunargagna og halda tækniskjölun og atvikaskrám',
      'Tryggja mannlegt eftirlit, nákvæmni og netöryggi',
      'Standast samræmismat, CE-merkja kerfið og skrá það í gagnagrunn ESB',
    ],
    after: [fineHigh],
  },
  deployer: {
    subtitle: 'Helstu skyldur notanda',
    items: [
      'Nota kerfið í samræmi við leiðbeiningar þróunaraðila',
      'Tryggja mannlegt eftirlit hæfs starfsfólks og vakta virkni kerfisins',
      'Upplýsa þá sem ákvarðanir beinast að; opinberir aðilar meta auk þess áhrif á grundvallarréttindi',
    ],
    after: [fineHigh],
  },
  importer: {
    subtitle: 'Skyldur innflytjenda og dreifingaraðila',
    items: [
      'Ganga úr skugga um að kerfið beri CE-merkingu og að skjölun og samræmismat þróunaraðila liggi fyrir',
      'Setja ekki kerfi á markað sem uppfyllir ekki kröfurnar og upplýsa yfirvöld um frávik',
    ],
  },
} satisfies Record<string, { subtitle: string; items: string[]; after?: string[] }>;

/** Transparency duties, one per ticked box in the "transparency" step */
export const transparency = {
  title: 'Gagnsæiskröfur eiga við að auki',
  items: {
    chat: 'Upplýsa þarf fólk um að það eigi í samskiptum við gervigreind, nema það sé augljóst af samhenginu. Gildir frá ágúst 2026.',
    gen: 'Efni sem kerfið býr til skal merkt á vélrænan hátt. Gildir frá ágúst 2026; kerfi á markaði fyrir 2. ágúst 2026 hafa frest til 2. desember 2026.',
    deep: 'Djúpfalsanir skal merkja skýrt og sýnilega svo viðtakandi viti að efnið sé tilbúið.',
    emo: 'Upplýsa þarf þá sem verða fyrir tilfinningagreiningu eða lífkennaflokkun um notkunina.',
  } as Record<string, string>,
  after: ['Brot á gagnsæiskröfum varða sektum allt að 15 milljónum evra eða 3% af árlegri heildarveltu á heimsvísu.'],
};

/** Note on when the rules apply, by market */
export const marketNote = {
  is: 'Starfsemin er eingöngu innanlands: skyldurnar taka gildi á Íslandi með innleiðingu reglugerðarinnar. Ráðuneytið áætlar að frumvarp verði lagt fram haustið 2027 og dagsetningarnar hér að ofan sýna gildistökuna innan ESB.',
  eu: 'Kerfið tengist ESB-markaði og reglugerðin getur því átt við nú þegar, óháð innleiðingunni á Íslandi.',
};

export const labels = {
  back: 'Til baka',
  restart: 'Meta annað kerfi',
  basis: 'Forsendur matsins:',
  role: { provider: 'þróunaraðila', deployer: 'notanda', importer: 'innflytjanda eða dreifingaraðila' } as Record<string, string>,
  basisRole: 'hlutverk',
  basisAreas: (n: number) => `svið: ${n} merkt`,
  basisTransparency: (n: number) => `gagnsæisatriði: ${n}`,
  basisMarket: (m: string) => `markaður: ${m === 'eu' ? 'ESB' : 'innanlands'}`,
  noScript: 'Sjálfsmatið þarf JavaScript. Kveiktu á því í vafranum til að nota það.',
};
