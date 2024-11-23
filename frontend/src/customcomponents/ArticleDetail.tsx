import { useState, useEffect } from "react";
import { formatDate } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import { api } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RelatedArticles } from "./RelatedArticles";
import { SocialShare } from "./SocialShare";

interface ArticleData {
  title: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string;
  image: string;
  relatedArticles: Array<{
    id: string;
    title: string;
    summary: string;
    image: string;
    date: string;
  }>;
}

interface ArticleDetailProps {
  id: string;
}

export function ArticleDetail({ id }: ArticleDetailProps) {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commenting out the axios request and using mock data
    const fetchArticle = async () => {
      setLoading(true);
      setTimeout(() => {
        const mockArticle: ArticleData = {
          title: "Sample Article Title",
          date: "2024-11-23",
          author: {
            name: "John Doe",
            role: "Writer",
            avatar: "https://picsum.photos/100/100",
          },
          content: "<p>This is a sample article content.</p>",
          image: "https://picsum.photos/300/200",
          relatedArticles: [
            {
              id: "1",
              title: "Related Article 1",
              summary: "Summary of the first related article.",
              image: "https://picsum.photos/310/200",
              date: "2024-11-22",
            },
            {
              id: "2",
              title: "Related Article 2",
              summary: "Summary of the second related article.",
              image: "https://picsum.photos/320/200",
              date: "2024-11-21",
            },
          ],
        };
        setArticle(mockArticle);
        setLoading(false);
      }, 1000); // Simulating network delay
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-[400px] w-full mb-6" />
        <div className="space-y-4 mb-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={article.author.avatar}
              alt={article.author.name}
            />
            <AvatarFallback>{article.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{article.author.name}</p>
            <p className="text-sm text-muted-foreground">
              {article.author.role}
            </p>
          </div>
        </div>
        <time className="text-sm text-muted-foreground">
          {formatDate(article.date)}
        </time>
      </div>
      <img
        src={article.image}
        alt={article.title}
        className="w-full h-[400px] object-cover rounded-lg mb-6"
      />
      <div
        className="prose max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <Card className="mb-8">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <h3 className="font-semibold mb-1">Share this article</h3>
            <p className="text-sm text-muted-foreground">Spread the word!</p>
          </div>
          <SocialShare url={window.location.href} title={article.title} />
        </CardContent>
      </Card>
      <RelatedArticles articles={article.relatedArticles} />
    </article>
  );
}
