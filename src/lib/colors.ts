/** Category colour sets from the Figma design system ("Category colors"). */
export const categoryColors = {
  pink: { base: '#ECA2B1', text: '#B06674' },
  mustard: { base: '#C0B457', text: '#A29639' },
  teal: { base: '#90D0C9', text: '#498A82' },
  brown: { base: '#907A4E', text: '#695326' },
  purple: { base: '#946AB4', text: '#774D96' },
  blue: { base: '#6774CA', text: '#3F4CA2' },
  green: { base: '#8ABD6C', text: '#598C3B' },
  red: { base: '#E3997D', text: '#BB7155' },
  army: { base: '#B6B5A2', text: '#787267' },
} as const;

export type CategoryColor = keyof typeof categoryColors;

/**
 * Artwork sets in public/flokkar/<key>/ (card.svg + hero.svg), from the Figma file.
 * A category picks one with its `art` field, so renaming a category (or changing
 * its address) never breaks its picture. Keys are the original folder names.
 */
export const categoryArtwork = {
  'adgerdir-og-stefna-islands': 'Mælistika (bleik)',
  atvinnulifid: 'Hækkandi línurit (sinnep)',
  'abyrg-notkun': 'Geislar (grænblá)',
  'einstaklingurinn-og-samfelagid': 'Ferningar (brún)',
  'rannsoknir-og-faernisuppbygging': 'Láréttar línur (fjólublá)',
  'log-og-regla': 'Sporbaugar (blá)',
  'umhverfis-og-orkumal': 'Lykkjur (græn)',
  gervigreindarfullveldi: 'Hljóðbylgjur (rauð)',
  skodanapistlar: 'Punktar (grágræn)',
} as const;

export type CategoryArtwork = keyof typeof categoryArtwork;

/** CSS custom properties for a category, for use in a `style` attribute. */
export function categoryVars(color: CategoryColor): string {
  const { base, text } = categoryColors[color];
  return `--cat-base: ${base}; --cat-text: ${text};`;
}
