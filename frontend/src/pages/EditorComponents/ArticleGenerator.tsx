import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onGenerate: (title: string, content: string, headers: string[]) => void;
}

export default function ArticleGenerator({ onGenerate }: Props) {
  const [topic, setTopic] = useState("EV");
  const [keywords, setKeywords] = useState("german,market,electric,green");
  const [facts, setFacts] = useState("adoption");
  const [tone, setTone] = useState("opinionated");
  const [style, setStyle] = useState("casual");
  const [targetAudience, setTargetAudience] = useState("beginners");
  const [articleLength, setArticleLength] = useState(500);

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_ARTICLE_ENDPOINT,

        {
          articles_ids: ["string"], // You might want to update this based on your needs
          user_prefs: {
            tone,
            style,
            target_audiance: targetAudience,
            article_length: articleLength,
            keywords: keywords.split(",").map((k) => k.trim()),
            facts: facts.split("\n").map((f) => f.trim()),
          },
        }
      );

      const { title, paragraphs, headers } = response.data;
      const content = paragraphs.join("\n\n");
      onGenerate(title, content, headers);
    } catch (error) {
      console.error("Error generating article:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <Textarea
        placeholder="Enter keywords (comma-separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <Textarea
        placeholder="Enter facts (one per line)"
        value={facts}
        onChange={(e) => setFacts(e.target.value)}
      />
      <Select value={tone} onValueChange={setTone}>
        <SelectTrigger>
          <SelectValue placeholder="Select tone" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="opinionated">Opinionated</SelectItem>
          <SelectItem value="neutral">Neutral</SelectItem>
          <SelectItem value="formal">Formal</SelectItem>
        </SelectContent>
      </Select>
      <Select value={style} onValueChange={setStyle}>
        <SelectTrigger>
          <SelectValue placeholder="Select style" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="casual">Casual</SelectItem>
          <SelectItem value="academic">Academic</SelectItem>
          <SelectItem value="journalistic">Journalistic</SelectItem>
        </SelectContent>
      </Select>
      <Select value={targetAudience} onValueChange={setTargetAudience}>
        <SelectTrigger>
          <SelectValue placeholder="Select target audience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="beginners">Beginners</SelectItem>
          <SelectItem value="intermediate">Intermediate</SelectItem>
          <SelectItem value="experts">Experts</SelectItem>
        </SelectContent>
      </Select>
      <Input
        type="number"
        placeholder="Article length"
        value={articleLength}
        onChange={(e) => setArticleLength(Number(e.target.value))}
      />
      <Button onClick={handleGenerate}>Generate Article</Button>
    </div>
  );
}
