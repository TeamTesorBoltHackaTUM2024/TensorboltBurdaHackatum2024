// services/articleService.ts
import axios from "axios";
import { apiClient } from "./axoisConfig";

export const fetchArticles = async () => {
  const { data } = await apiClient.get("/articles");
  return data;
};

export const fetchArticleById = async (id: number) => {
  const { data } = await apiClient.get(`/articles/${id}`);
  return data;
};

export const createArticle = async (article: any) => {
  const { data } = await apiClient.post("/articles", article);
  return data;
};

export const updateArticle = async (id: number, article: any) => {
  const { data } = await apiClient.put(`/articles/${id}`, article);
  return data;
};

export const deleteArticle = async (id: number) => {
  const { data } = await apiClient.delete(`/articles/${id}`);
  return data;
};
