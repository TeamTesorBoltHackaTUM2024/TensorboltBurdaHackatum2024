// hooks/useUpdateArticle.ts
import { updateArticle } from "@/api/articleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: any) => updateArticle(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["articles"]);
      queryClient.invalidateQueries(["article", id]);
    },
  });
};

export default useUpdateArticle;
