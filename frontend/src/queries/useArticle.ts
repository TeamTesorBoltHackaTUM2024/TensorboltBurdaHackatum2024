// hooks/useArticle.ts
import { fetchArticleById } from "@/api/articleService";
import { useQuery } from "@tanstack/react-query";

const useArticle = (id: number) =>
  useQuery({
    queryKey: ["article", id],
    queryFn: () => fetchArticleById(id),
  });

export default useArticle;
