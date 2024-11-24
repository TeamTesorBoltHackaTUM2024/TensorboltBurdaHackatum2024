import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KeyFeatures() {
  return (
    <Card className="bg-cyan-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">🌟 Key Features</CardTitle>
      </CardHeader>
      <CardContent className="text-black space-y-2">
        <p>
          🔍 <b>Automated News Parsing</b>: Continuously extracts EV-related
          content.
        </p>
        <p>
          🤖 <b>LLM-Powered Analysis</b>: Summarizes articles and extracts
          metadata.
        </p>
        <p>
          🔥 <b>Trending Topics Detection</b>: Finds the hottest news in the EV
          sector.
        </p>
        <p>
          🎨 <b>Media Enrichment</b>: Creates visuals and videos for engaging
          content.
        </p>
        <p>
          🔧 <b>Customizable Content</b>: Tailors articles to user preferences.
        </p>
      </CardContent>
    </Card>
  );
}

export function ProblemSolved() {
  return (
    <Card className="bg-yellow-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">
          💡 Problem Solved
        </CardTitle>
      </CardHeader>
      <CardContent className="text-black space-y-2">
        <p>📚 Tackles information overload with curated EV news.</p>
        <p>🌍 Promotes eco-friendly transportation and awareness.</p>
        <p>🕒 Provides trusted, timely, and customizable news articles.</p>
      </CardContent>
    </Card>
  );
}

export function Inspiration() {
  return (
    <Card className="bg-teal-100 mb-4">
      <CardHeader>
        <CardTitle className="text-black font-bold">✨ Inspiration</CardTitle>
      </CardHeader>
      <CardContent className="text-black space-y-2">
        <p>
          🚀 Inspired by the challenges of staying informed and encouraging
          sustainable transport.
        </p>
        <p>
          🤝 Bridges the gap between quality news availability and the need for
          EV awareness.
        </p>
      </CardContent>
    </Card>
  );
}

export function FuturePlans() {
  return (
    <Card className="border-cyan-500 border-2">
      <CardHeader>
        <CardTitle className="text-black font-bold">🔮 Future Plans</CardTitle>
      </CardHeader>
      <CardContent className="text-black space-y-2">
        <p>🌍 Localized Content Delivery: Trending topics by region.</p>
        <p>🎙️ Podcast Integration: Auto-generate podcasts from news content.</p>
        <p>
          🗺️ Advanced Topic Mapping: Interconnected maps for deeper insights.
        </p>
      </CardContent>
    </Card>
  );
}

export function RightSidebar() {
  return (
    <div className="w-full lg:w-64 space-y-4">
      <ProblemSolved />
      <Inspiration />
      <KeyFeatures />
      <FuturePlans />
    </div>
  );
}
