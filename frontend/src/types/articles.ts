// types/article.ts
export interface GenArticle {
  title: string;
  paragraphs: string[];
  headers: string[];
}

export interface NewsData {
  summary: string;
  keywords: string[];
  facts: string[];
  important_dates: Record<string, string>; // Dict equivalent in Python
}

export interface ArticleCreate {
  content: GenArticle;
  news_data?: NewsData; // Optional
}

export interface ArticleUpdate {
  content?: GenArticle; // Optional
  news_data?: NewsData; // Optional
}

export interface ArticleResponse {
  id: number;
  content: GenArticle;
  news_data?: NewsData | null; // Optional or nullable
  created_at: string; // ISO timestamp
  updated_at?: string | null; // Optional or nullable ISO timestamp
}

export interface BulkDeleteRequest {
  article_ids: number[];
}
