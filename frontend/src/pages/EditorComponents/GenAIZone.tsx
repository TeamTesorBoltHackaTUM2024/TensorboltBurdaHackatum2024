import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function GenAIZone() {
  const [type, setType] = useState("thumbnail");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const endpoint =
        type === "thumbnail"
          ? "https://flask-image-video-app-text-443115597624.europe-west3.run.app/generate-image"
          : "https://flask-image-video-app-text-443115597624.europe-west3.run.app/generate-video";

      const body =
        type === "thumbnail"
          ? JSON.stringify({ titles: [prompt], size: "1024x1024" })
          : JSON.stringify({
              titles: [prompt],
              texts: ["Sample description"],
              num_images: 2,
              vid_length: 8,
            });

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error("Failed to generate content. Please try again.");
      }

      const data = await response.json();
      setResult(type === "thumbnail" ? data.image_url : data.video_url);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <RadioGroup value={type} onValueChange={setType}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="thumbnail" id="thumbnail" />
          <Label htmlFor="thumbnail">Thumbnail</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="video" id="video" />
          <Label htmlFor="video">Short Form Animation Video</Label>
        </div>
      </RadioGroup>

      <Input
        placeholder="Enter prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate"}
      </Button>

      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-4">
          {type === "thumbnail" ? (
            <img src={result} alt="Generated thumbnail" className="w-full" />
          ) : (
            <video src={result} controls className="w-full">
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      )}
    </div>
  );
}
