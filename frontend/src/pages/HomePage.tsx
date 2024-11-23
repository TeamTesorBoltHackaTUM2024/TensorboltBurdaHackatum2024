import { GridLayout } from "@/customcomponents/GridLayout";
import { Hero } from "@/customcomponents/Hero";
import { NewsGrid } from "@/customcomponents/NewsGrid";
import { RightSidebar } from "@/customcomponents/RightSidebar";
import { SearchAndFilter } from "@/customcomponents/SearchAndFilter";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <SearchAndFilter />
            <h2 className="text-2xl font-bold mb-4">Latest News</h2>
            <NewsGrid />
            <h2 className="text-2xl font-bold my-8">Featured Content</h2>
            <GridLayout items={[]} /> {/* Add sample data or fetch from API */}
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
