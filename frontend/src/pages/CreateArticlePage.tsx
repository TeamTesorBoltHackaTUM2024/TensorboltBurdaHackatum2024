import { Button } from "@/components/ui/button";
import RichTextEditor from "@/customcomponents/RichTextEditor";
import useCreateArticle from "@/queries/useCreateArticle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function CreateArticlePage() {
  const [value, setValue] = useState("");
  const mutation = useCreateArticle();
  const navigate = useNavigate();

  const handleSubmit = () => {
    mutation.mutate(
      { content: { title: value, paragraphs: [], headers: [] } },
      {
        onSuccess: () => {
          navigate("/", { state: { refresh: true } }); // Pass state to trigger refresh
        },
      }
    );
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <RichTextEditor
        value={value}
        onChange={setValue}
        className="mb-6 w-full max-w-3xl"
      />
      <Button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
