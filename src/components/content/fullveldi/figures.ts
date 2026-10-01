/** The figures FvFigure can show, with the names the editor lists them by. */
export const fvFigures = {
  stations: 'Fjögur þrep — og eitt utan kvarða',
  'stations-status': 'Hvar stendur Ísland — hvað liggur fyrir',
  matrix: 'Tvær spurningar um hvert kerfi',
  weave: 'Stoðir og þverlæg skilyrði (vefnaður)',
  dots: '210 stofnanir, fáir birgjar',
  stack: 'Hvað flyst á milli líkana?',
  routes: 'Tveir ásar',
} as const;

export type FvFigureName = keyof typeof fvFigures;
