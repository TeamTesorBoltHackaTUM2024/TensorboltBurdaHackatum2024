import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface Props {
  content: string;
}

export default function ArticleEvaluator({ content }: Props) {
  const [scores, setScores] = useState({
    readability: 0,
    seo: 0,
    engagement: 0,
    originality: 0,
    coherence: 0,
  });

  useEffect(() => {
    // Implement actual evaluation logic here
    // For now, we'll just use random scores
    setScores({
      readability: Math.floor(Math.random() * 10) + 1,
      seo: Math.floor(Math.random() * 10) + 1,
      engagement: Math.floor(Math.random() * 10) + 1,
      originality: Math.floor(Math.random() * 10) + 1,
      coherence: Math.floor(Math.random() * 10) + 1,
    });
  }, [content]);

  return (
    <div className="space-y-4">
      {Object.entries(scores).map(([metric, score]) => (
        <div key={metric} className="space-y-2">
          <div className="flex justify-between">
            <span className="capitalize">{metric}</span>
            <span>{score}/10</span>
          </div>
          <Progress value={score * 10} className="w-full" />
        </div>
      ))}
    </div>
  );
}
