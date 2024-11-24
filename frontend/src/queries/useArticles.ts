// hooks/useArticles.ts
import { fetchArticles } from "@/api/articleService";
import { useQuery } from "@tanstack/react-query";

const useArticles = () =>
  useQuery({
    queryKey: ["articles"],
    queryFn: fetchArticles,
  });

export default useArticles;
