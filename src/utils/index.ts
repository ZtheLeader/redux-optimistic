import { TypeArticle } from "../types";

export const findCurrentArticleAndIndexFromState = (stateArticles: TypeArticle[], articleId: number | string) => {
  const index = stateArticles.findIndex(article => article.id === articleId);
  return { index, article: stateArticles[index] }
}