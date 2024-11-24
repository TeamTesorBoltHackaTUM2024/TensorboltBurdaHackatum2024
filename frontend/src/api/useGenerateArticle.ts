// src/api/articleService.ts

import axios from "axios";

interface GenerateArticleRequest {
  articles_ids: string[];
  user_prefs: {
    tone: "opinionated" | "neutral";
    style: "casual" | "formal";
    target_audience: "beginners" | "experts" | "hobbyist";
    article_length: number;
    keywords: string[];
    facts: any[]; // Adjust the type based on your actual data
  };
}

interface GenerateArticleResponse {
  title: string;
  paragraphs: string[];
  headers: string[];
}

export const generateArticle = async (
  data: GenerateArticleRequest
): Promise<GenerateArticleResponse> => {
  const response = await axios.post(
    import.meta.env.VITE_BACKEND_ARTICLE_ENDPOINT,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to generate article");
  }
  return response.data;
};
