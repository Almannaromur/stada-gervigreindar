/**
 * Image paths written by the editor are plain strings, normally
 * "/src/content/greinar/<article>/<file>" (the image sits next to the article).
 * They are looked up here so they still go through Astro's image optimisation.
 * A bare file name ("mynd-1.png") is resolved against the current article;
 * public paths ("/logos/…") are returned unchanged.
 */
const articleImages = import.meta.glob<{ default: ImageMetadata }>('/src/content/greinar/**/*.{png,jpg,jpeg,webp,gif,svg}', {
  eager: true,
});

export function resolveImage(src: string, articleId: string | undefined): ImageMetadata | string {
  if (/^(\/|https?:)/.test(src) && !src.startsWith('/src/')) return src;
  const file = src.replace(/^\.\//, '').replace(/^\/src\/content\/greinar\/[^/]+\//, '');
  const key = src.startsWith('/src/') ? src : `/src/content/greinar/${articleId}/${file}`;
  const image = articleImages[key];
  if (!image) throw new Error(`Mynd fannst ekki: "${src}" (grein: ${articleId ?? '?'})`);
  return image.default;
}
