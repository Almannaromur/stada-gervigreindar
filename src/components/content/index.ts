// Components available inside articles. The article page passes all of these to
// the MDX content, so articles use them without importing anything.
// Each one also needs an editor definition in src/editor/components.ts
// (`npm run check` fails if they get out of step).
export { default as Bar } from './Bar.astro';
export { default as BarChart } from './BarChart.astro';
export { default as Box } from './Box.astro';
export { default as Callout } from './Callout.astro';
export { default as Collapsible } from './Collapsible.astro';
export { default as Columns } from './Columns.astro';
export { default as Figure } from './Figure.astro';
export { default as Interview } from './Interview.astro';
export { default as Lead } from './Lead.astro';
export { default as Note } from './Note.astro';
export { default as Pillars } from './Pillars.astro';
export { default as PullQuote } from './PullQuote.astro';
export { default as Question } from './Question.astro';
export { default as Quote } from './Quote.astro';
export { default as Rating } from './Rating.astro';
export { default as Ref } from './Ref.astro';
export { default as SeeAlso } from './SeeAlso.astro';
export { default as SelfAssessment } from './SelfAssessment.astro';
export { default as SolutionRatings } from './SolutionRatings.astro';
export { default as Stat } from './Stat.astro';
export { default as Steps } from './Steps.astro';
export { default as Timeline } from './Timeline.astro';
export { default as TimelineItem } from './TimelineItem.astro';
export { default as TimelineToday } from './TimelineToday.astro';

// Figures and cards for "Hvað er gervigreindarfullveldi?" (version B, for comparison)
export { default as FvCard } from './fullveldi/FvCard.astro';
export { default as FvFigure } from './fullveldi/FvFigure.astro';
export { default as FvFrame } from './fullveldi/FvFrame.astro';
