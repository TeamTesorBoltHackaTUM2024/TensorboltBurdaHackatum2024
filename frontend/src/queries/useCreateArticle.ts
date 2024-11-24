// hooks/useCreateArticle.ts
import { createArticle } from "@/api/articleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

export default useCreateArticle;
