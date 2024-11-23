// hooks/useDeleteArticle.ts
import { deleteArticle } from "@/api/articleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
    },
  });
};

export default useDeleteArticle;
