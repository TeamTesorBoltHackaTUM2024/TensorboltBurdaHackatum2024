import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface HeroData {
  title: string;
  description: string;
  image: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commenting out the axios request and using mock data
    setLoading(true);
    setTimeout(() => {
      const mockHeroData: HeroData = {
        title: "Trending Topics",
        description: "Here is a brief description of the hero section.",
        image: "https://picsum.photos/1800/900",
        primaryCta: {
          text: "Get Started",
          href: "/get-started",
        },
        secondaryCta: {
          text: "Learn More",
          href: "/learn-more",
        },
      };
      setHeroData(mockHeroData);
      setLoading(false);
    }, 1000); // Simulating network delay
  }, []);

  if (loading) {
    return (
      <div className="relative h-[600px] w-full overflow-hidden bg-gray-200">
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <Card className="bg-black/80 text-white max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Skeleton className="h-10 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-6" />
              <div className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!heroData) return null;

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <img
        src={heroData.image}
        alt={heroData.title}
        className="absolute inset-0 object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
        <Card className="bg-black/80 text-white max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {heroData.title}
            </h1>
            <p className="text-lg mb-6">{heroData.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <a href={heroData.primaryCta.href}>
                  {heroData.primaryCta.text}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href={heroData.secondaryCta.href}>
                  {heroData.secondaryCta.text}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
