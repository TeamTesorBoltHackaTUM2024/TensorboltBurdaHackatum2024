import { Hero } from "@/customcomponents/Hero";
import { RightSidebar } from "@/customcomponents/RightSidebar";
import { Trends } from "@/customcomponents/Trends";

export function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Latest Trends</h2>
            <Trends />
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  );
}
