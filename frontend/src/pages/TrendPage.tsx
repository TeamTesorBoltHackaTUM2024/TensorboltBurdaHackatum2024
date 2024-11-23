import { Button } from "@/components/ui/button";
import { Hero } from "@/customcomponents/Hero";
import { RightSidebar } from "@/customcomponents/RightSidebar";
import { SearchAndFilter } from "@/customcomponents/SearchAndFilter";
import { TrendArticlesGrid } from "@/customcomponents/TrendArticlesGrid";
import { Link } from "react-router-dom";

export function TrendPage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <SearchAndFilter />
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <Link to={"/trend/2/generate"}>
              <Button>Generate</Button>
            </Link>
            <TrendArticlesGrid />
            <h2 className="text-2xl font-bold my-8">Featured Content</h2>
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
