// services/articleService.ts
import {
  ArticleResponse,
  ArticleCreate,
  ArticleUpdate,
  BulkDeleteRequest,
} from "@/types/articles";
import { apiClient } from "./axoisConfig";

export const fetchArticles = async (): Promise<ArticleResponse[]> => {
  const { data } = await apiClient.get<ArticleResponse[]>("/articles");
  return data;
};

export const fetchArticleById = async (
  id: number
): Promise<ArticleResponse> => {
  const { data } = await apiClient.get<ArticleResponse>(`/articles/${id}`);
  return data;
};

export const createArticle = async (
  article: ArticleCreate
): Promise<ArticleResponse> => {
  const { data } = await apiClient.post<ArticleResponse>("/articles", article);
  return data;
};

export const updateArticle = async (
  id: number,
  article: ArticleUpdate
): Promise<ArticleResponse> => {
  const { data } = await apiClient.put<ArticleResponse>(
    `/articles/${id}`,
    article
  );
  return data;
};

export const deleteArticle = async (
  id: number
): Promise<{ detail: string }> => {
  const { data } = await apiClient.delete<{ detail: string }>(
    `/articles/${id}`
  );
  return data;
};

export const bulkDeleteArticles = async (
  request: BulkDeleteRequest
): Promise<{ detail: string }> => {
  const { data } = await apiClient.delete<{ detail: string }>(
    "/articles/bulk",
    { data: request }
  );
  return data;
};
