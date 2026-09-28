import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'greinar'>;
export type Category = CollectionEntry<'flokkar'>;

/** Categories in menu order. */
export async function getCategories(): Promise<Category[]> {
  const categories = await getCollection('flokkar');
  return categories.sort((a, b) => a.data.order - b.data.order);
}

const newestFirst = (a: Article, b: Article) =>
  b.data.date.getTime() - a.data.date.getTime() || a.data.title.localeCompare(b.data.title, 'is');

/** Published articles, newest first: for lists, the homepage and "Næsta grein". */
export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('greinar', ({ data }) => !data.draft);
  return articles.sort(newestFirst);
}

/** All articles including drafts: every article gets a page, drafts only reachable by link. */
export async function getAllArticles(): Promise<Article[]> {
  return (await getCollection('greinar')).sort(newestFirst);
}

export async function getCategory(article: Article): Promise<Category> {
  const category = await getEntry(article.data.category);
  if (!category) throw new Error(`Grein "${article.id}" vísar í flokk sem er ekki til: ${article.data.category.id}`);
  return category;
}

/**
 * One reading path through the whole site: categories in menu order, and within
 * each category its articles newest first. "Næsta grein" is the next step on that
 * path, so readers finish a category before moving on, and the last article leads
 * back to the first. Empty categories are skipped.
 */
export function readingPath(articles: Article[], categories: Category[]): Article[] {
  return categories.flatMap((c) => articles.filter((a) => a.data.category.id === c.id));
}

export function nextArticle(article: Article, path: Article[]): Article | undefined {
  if (path.length < 2) return undefined;
  const i = path.findIndex((a) => a.id === article.id);
  return path[(i + 1) % path.length];
}

export const articleUrl = (article: Article) => `/greinar/${article.id}`;
export const categoryUrl = (category: Category) => `/flokkar/${category.id}`;
export const categoryArt = (category: Category, kind: 'card' | 'hero') => `/flokkar/${category.data.art}/${kind}.svg`;

const dateFormat = new Intl.DateTimeFormat('is-IS', { day: 'numeric', month: 'long', year: 'numeric' });

/** 24. september 2026 */
export function formatDate(date: Date): string {
  return dateFormat.format(date);
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
