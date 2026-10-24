/**
 * One-off articles with a page design of their own instead of the standard article page,
 * by slug. Otherwise they are ordinary articles: edited in Keystatic, listed, searchable and
 * drafts like any other. If a slug here no longer matches (renamed), the article simply gets
 * the standard page.
 */
import type { Article, Category } from '@/lib/content';
import GallupArticle from './GallupArticle.astro';

export interface CustomArticleProps {
  article: Article;
  category: Category;
}

export const customArticlePages: Record<string, (props: CustomArticleProps) => unknown> = {
  'chatgpt-i-yfirburdastodu-a-islandi': GallupArticle,
};
