import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useArticles from "@/queries/useArticles";
import { useNavigate, useLocation } from "react-router-dom";

export function HomePage() {
  const { data: articles = [], isLoading, refetch } = useArticles();
  const navigate = useNavigate();
  const location = useLocation();

  // Trigger refetch if `location.state` signals a change
  if (location.state?.refresh) {
    refetch();
    // Clear state to avoid endless refetching
    location.state.refresh = false;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <Button onClick={() => navigate("/article/new")} className="mb-6">
        Create New Article
      </Button>
      {articles.length === 0 ? (
        <div>No articles available. Create a new one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">
          {articles.map((article: any) => (
            <Card
              key={article.id}
              className="p-4 flex flex-col justify-between"
            >
              <h2 className="font-bold text-lg mb-4">
                {article.content?.title || "Untitled"}
              </h2>
              <Button onClick={() => navigate(`/article/${article.id}`)}>
                View
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
