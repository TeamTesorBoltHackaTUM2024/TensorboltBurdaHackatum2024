import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface RelatedArticle {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Related to this article</h2>
      {articles.map((article) => (
        <Card key={article.id} className="overflow-hidden">
          <div className="flex">
            <img
              src={article.image}
              alt={article.title}
              className="w-1/3 object-cover"
            />
            <div className="w-2/3 p-4">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-lg line-clamp-2">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {article.summary}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatDate(article.date)}
                </span>
              </CardContent>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
