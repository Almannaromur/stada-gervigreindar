// Components available inside articles. The article page passes all of these to
// the MDX content, so articles use them without importing anything.
// Each one also needs an editor definition in src/editor/components.ts
// (`npm run check` fails if they get out of step).
export { default as Box } from './Box.astro';
export { default as Callout } from './Callout.astro';
export { default as Figure } from './Figure.astro';
export { default as Interview } from './Interview.astro';
export { default as PullQuote } from './PullQuote.astro';
export { default as Quote } from './Quote.astro';
export { default as Rating } from './Rating.astro';
export { default as Ref } from './Ref.astro';
export { default as SolutionRatings } from './SolutionRatings.astro';
export { default as Stat } from './Stat.astro';
