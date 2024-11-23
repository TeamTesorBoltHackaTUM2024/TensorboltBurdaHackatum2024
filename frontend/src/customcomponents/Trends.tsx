import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface Trend {
  trend_id: string;
  trend_name: string;
  trend_image: string;
  trend_subtopics: string[];
  trend_performance: number;
}

export function Trends() {
  const [existingTrends, setExistingTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch with mock trends
    setLoading(true);
    setTimeout(() => {
      const mockExistingTrends: Trend[] = [
        {
          trend_id: "1",
          trend_name: "Artificial Intelligence in Healthcare",
          trend_image: "https://picsum.photos/900/300",
          trend_subtopics: ["Machine Learning", "Diagnostics", "Patient Care"],
          trend_performance: 5, // Positive indicates an upward trend
        },
        {
          trend_id: "2",
          trend_name: "Sustainable Energy Solutions",
          trend_image: "https://picsum.photos/900/300",
          trend_subtopics: ["Solar Power", "Wind Energy", "Energy Storage"],
          trend_performance: -3, // Negative indicates a downward trend
        },
      ];
      setExistingTrends(mockExistingTrends);
      setLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex p-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <Skeleton className="h-24 w-24 rounded" />
            </div>
            <CardContent className="border-t pt-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <div className="space-x-2">
                  <Skeleton className="h-6 w-16 inline-block" />
                  <Skeleton className="h-6 w-16 inline-block" />
                  <Skeleton className="h-6 w-16 inline-block" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {existingTrends.map((trend) => (
        <Link
          to={`/trend/${trend.trend_id}`}
          key={trend.trend_id}
          className="block"
        >
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="flex p-4">
              <div className="flex-1 space-y-2">
                <CardHeader className="p-0">
                  <h2 className="text-xl font-bold">{trend.trend_name}</h2>
                </CardHeader>
                <CardContent className="p-0 text-sm text-muted-foreground">
                  <p className="line-clamp-2">
                    {trend.trend_subtopics.join(", ")}
                  </p>
                </CardContent>
              </div>
              <img
                src={trend.trend_image}
                alt={trend.trend_name}
                className="w-24 h-24 object-cover rounded"
              />
            </div>
            <CardContent className="border-t pt-4 flex justify-between items-center">
              <div
                className={`text-sm font-semibold flex items-center gap-1 ${
                  trend.trend_performance > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {trend.trend_performance > 0 ? (
                  <>
                    <ArrowUpIcon className="w-4 h-4" />
                    <span>{trend.trend_performance}</span>
                  </>
                ) : (
                  <>
                    <ArrowDownIcon className="w-4 h-4" />
                    <span>{Math.abs(trend.trend_performance)}</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {trend.trend_subtopics.slice(0, 3).map((subtopic, index) => (
                  <Badge key={index} variant="secondary">
                    {subtopic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
