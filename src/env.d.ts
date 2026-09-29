declare namespace App {
  interface Locals {
    /** Set by the article page so content components can resolve image paths next to the article */
    articleId?: string;
    /** Set by the article page: in drafts, components show a notice instead of failing the build */
    articleDraft?: boolean;
  }
}
