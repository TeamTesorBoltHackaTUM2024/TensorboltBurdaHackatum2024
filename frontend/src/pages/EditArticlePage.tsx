import { Button } from "@/components/ui/button";
import RichTextEditor from "@/customcomponents/RichTextEditor";
import useArticle from "@/queries/useArticle";
import useUpdateArticle from "@/queries/useUpdateArticle";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditArticlePage() {
  const { id } = useParams();
  const { data: article, isLoading } = useArticle(Number(id));
  const mutation = useUpdateArticle(Number(id));
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleSubmit = () => {
    mutation.mutate(
      { content: { title: value, paragraphs: [], headers: [] } },
      {
        onSuccess: () => {
          navigate("/", { state: { refresh: true } });
        },
      }
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <RichTextEditor
        value={value || article?.content?.title || ""}
        onChange={setValue}
        className="mb-6 w-full max-w-3xl"
      />
      <Button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Update"}
      </Button>
    </div>
  );
}
