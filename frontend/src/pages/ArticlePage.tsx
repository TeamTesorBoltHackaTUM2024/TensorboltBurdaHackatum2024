import { ArticleDetail } from "@/customcomponents/ArticleDetail";
import { RightSidebar } from "@/customcomponents/RightSidebar";
import { useParams } from "react-router-dom";

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Error: Article ID not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <ArticleDetail id={id} />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
