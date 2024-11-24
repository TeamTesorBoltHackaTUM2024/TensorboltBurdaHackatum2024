// import { ArticleDetail } from "@/customcomponents/ArticleDetail";
// import RichTextEditor from "@/customcomponents/RichTextEditor";
// import { RightSidebar } from "@/customcomponents/RightSidebar";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export function ArticlePage() {
//   const { id } = useParams<{ id: string }>();

//   if (!id) {
//     return <div>Error: Article ID not found.</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col lg:flex-row gap-8">
//         <div className="flex-1">
//           <ArticleDetail id={id} />
//         </div>
//         <RightSidebar />
//       </div>
//     </div>
//   );
// }
// pages/ArticlePage.tsx

import { Button } from "@/components/ui/button";
import useArticle from "@/queries/useArticle";
import useDeleteArticle from "@/queries/useDeleteArticle";
import { useNavigate, useParams } from "react-router-dom";

export function ArticlePage() {
  const { id } = useParams();
  const { data: article, isPending } = useArticle(Number(id));
  const mutation = useDeleteArticle(Number(id));
  const navigate = useNavigate();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleDelete = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/", { state: { refresh: true } }); // Pass state to trigger refresh
      },
    });
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">
        {article?.content?.title || "Untitled"}
      </h1>
      <div className="flex gap-4">
        <Button onClick={() => navigate(`/article/edit/${id}`)}>Edit</Button>
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
