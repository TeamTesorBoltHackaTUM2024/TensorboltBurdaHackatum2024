import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface ArticleGeneratorProps {
  articles: Array<{ id: string; title: string }>;
}

interface FormData {
  articleIds: string[];
  tone: "opinionated" | "neutral";
  style: "casual" | "formal";
  targetAudience: "beginners" | "experts" | "hobbyist";
  articleLength: "500" | "1000" | "2000";
  keywords: string;
  facts: string;
}

export function ArticleGenerator({ articles }: ArticleGeneratorProps) {
  const [generatedArticle, setGeneratedArticle] = useState<{
    title: string;
    paragraphs: string[];
    headers: string[];
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    // Ensure articlesIds is populated and is an array with at least one item
    if (!data.articleIds || data.articleIds.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one article.",
        variant: "destructive",
      });
      return; // Don't submit if no articles are selected
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate/article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          articles_ids: data.articleIds, // Use the array of selected article IDs
          user_prefs: {
            tone: data.tone,
            style: data.style,
            target_audiance: data.targetAudience, // Corrected key for target audience
            article_length: parseInt(data.articleLength), // Ensure it's an integer
            keywords: data.keywords
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k !== ""), // Remove empty strings from keywords
            facts: data.facts
              .split("\n")
              .map((f) => f.trim())
              .filter((f) => f !== ""), // Remove empty facts
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate article");
      }

      const result = await response.json();
      setGeneratedArticle(result); // Assuming `setGeneratedArticle` updates the UI with the generated article

      toast({
        title: "Article generated successfully",
        description: "Your new article is ready to view.",
      });
    } catch (error) {
      console.error("Error generating article:", error);
      toast({
        title: "Error",
        description: "Failed to generate article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Article Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="articleIds">Select Source Articles</Label>
                <Controller
                  name="articleIds"
                  control={control}
                  rules={{ required: "Please select at least one article" }}
                  render={({ field }) => (
                    <div className="space-y-2">
                      {articles.map((article) => (
                        <div
                          key={article.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={article.id}
                            checked={field.value?.includes(article.id)}
                            onCheckedChange={(checked) => {
                              const updatedValue = checked
                                ? [...(field.value || []), article.id]
                                : (field.value || []).filter(
                                    (id) => id !== article.id
                                  );
                              field.onChange(updatedValue);
                            }}
                          />
                          <Label htmlFor={article.id}>{article.title}</Label>
                        </div>
                      ))}
                    </div>
                  )}
                />
                {errors.articleIds && (
                  <p className="text-sm text-red-500">
                    {errors.articleIds.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="tone">Tone</Label>
                <Controller
                  name="tone"
                  control={control}
                  rules={{ required: "Please select a tone" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="opinionated" id="opinionated" />
                        <Label htmlFor="opinionated">Opinionated</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="neutral" />
                        <Label htmlFor="neutral">Neutral</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.tone && (
                  <p className="text-sm text-red-500">{errors.tone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="style">Style</Label>
                <Controller
                  name="style"
                  control={control}
                  rules={{ required: "Please select a style" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="casual" id="casual" />
                        <Label htmlFor="casual">Casual</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formal" id="formal" />
                        <Label htmlFor="formal">Formal</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.style && (
                  <p className="text-sm text-red-500">{errors.style.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience</Label>
                <Controller
                  name="targetAudience"
                  control={control}
                  rules={{ required: "Please select a target audience" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginners">Beginners</SelectItem>
                        <SelectItem value="experts">Experts</SelectItem>
                        <SelectItem value="hobbyist">Hobbyist</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.targetAudience && (
                  <p className="text-sm text-red-500">
                    {errors.targetAudience.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="articleLength">Article Length</Label>
                <Controller
                  name="articleLength"
                  control={control}
                  rules={{ required: "Please select an article length" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select article length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500">Short (500 words)</SelectItem>
                        <SelectItem value="1000">
                          Medium (1000 words)
                        </SelectItem>
                        <SelectItem value="2000">Long (2000 words)</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.articleLength && (
                  <p className="text-sm text-red-500">
                    {errors.articleLength.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                <Controller
                  name="keywords"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Enter keywords" />
                  )}
                />
              </div>

              <div>
                <Label htmlFor="facts">Additional Facts (one per line)</Label>
                <Controller
                  name="facts"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      placeholder="Enter additional facts"
                      rows={4}
                    />
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Article"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Article</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedArticle ? (
              <div className="space-y-4">
                <h2 className="text-xl font-bold">{generatedArticle.title}</h2>
                {generatedArticle.paragraphs.map((paragraph, index) => (
                  <div key={index}>
                    {generatedArticle.headers[index] && (
                      <h3 className="text-lg font-semibold mt-4 mb-2">
                        {generatedArticle.headers[index]}
                      </h3>
                    )}
                    <p>{paragraph}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>
                No article generated yet. Fill out the form and click "Generate
                Article" to create a new article.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
