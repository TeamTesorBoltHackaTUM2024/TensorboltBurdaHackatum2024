/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useUpdateArticle.ts
import { updateArticle } from "@/api/articleService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedData: any) => updateArticle(id, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", id] });
    },
  });
};

export default useUpdateArticle;
