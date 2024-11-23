import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
}

export function NewsGrid() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commenting out the axios request and using mock data
    setLoading(true);
    setTimeout(() => {
      const mockArticles: Article[] = [
        {
          id: "1",
          title: "Breaking News Article 1",
          description: "This is a description of the first breaking news.",
          image: "https://picsum.photos/300/200",
          date: "2024-11-21",
          category: "Technology",
        },
        {
          id: "2",
          title: "Breaking News Article 2",
          description: "This is a description of the second breaking news.",
          image: "https://picsum.photos/310/210",
          date: "2024-11-20",
          category: "Business",
        },
      ];
      setArticles(mockArticles);
      setLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <Link to={`/article/${article.id}`} key={article.id}>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="aspect-video relative">
              <img
                src={article.image}
                alt={article.title}
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {article.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(article.date)}
                </span>
              </div>
              <CardTitle className="line-clamp-2">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3">
                {article.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
