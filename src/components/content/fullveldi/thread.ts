/**
 * The thread: the article's recurring device. Three lines, numbered 1–3, one for each
 * verb of the working definition. It appears as the definition's ruled lines, the
 * threads across the pillars (FvPillars), the rows of the assessment card
 * (FvAssessment) and the margin numerals (FvNum). Only the numeral tells the lines apart.
 */

/** Label of line 3. Still open: „Geta skipt“ or „Geta breytt um leið“. */
export const line3Label = "Geta skipt";

export const threadLines = [
  "Vita á hvað við reiðum okkur",
  "Setja skilyrði",
  line3Label,
] as const;

/** The three pillars, used by FvPillars, the two-axis figure and the series strip */
export const pillars = [
  "Gögn og málföng",
  "Færni og mannauður",
  "Reiknigeta og innviðir",
] as const;
