/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/customcomponents/RichTextEditor";
import ArticleEvaluator from "./EditorComponents/ArticleEvaluator";
import GenAIZone from "./EditorComponents/GenAIZone";
import SourcesList from "./EditorComponents/SourcesList";
import ArticleGenerator from "./EditorComponents/ArticleGenerator";

export default function EditorPage() {
  const [title, setTitle] = useState("Untitled");
  const [content, setContent] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [sources, setSources] = useState([]);
  const [isSaved, setIsSaved] = useState(true);

  const handleSave = () => {
    // Implement save logic here
    setIsSaved(true);
  };

  const handlePublish = () => {
    // Implement publish logic here
    // Redirect to another page
  };

  const handleGenerate = (
    generatedTitle: string,
    generatedContent: string,
    generatedHeaders: string[]
  ) => {
    setTitle(generatedTitle);
    setContent(generatedContent);
    setHeaders(generatedHeaders);
    setIsSaved(false);
    // You might want to update sources here as well if the API provides that information
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIsSaved(false);
          }}
          className="text-3xl font-bold bg-transparent border-none focus:outline-none"
        />
        <div className="space-x-2">
          <Button
            onClick={handleSave}
            variant={isSaved ? "outline" : "default"}
          >
            {isSaved ? "Edit" : "Save"}
          </Button>
          <Button onClick={handlePublish}>Publish</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <RichTextEditor
            value={content}
            onChange={(value) => {
              setContent(value);
              setIsSaved(false);
            }}
          />
        </Card>
        <Card className="p-4">
          <Tabs defaultValue="generate">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="evaluate">Evaluate</TabsTrigger>
              <TabsTrigger value="genai">GenAI Zone</TabsTrigger>
            </TabsList>
            <TabsContent value="generate">
              <ArticleGenerator onGenerate={handleGenerate} />
            </TabsContent>
            <TabsContent value="evaluate">
              <ArticleEvaluator content={content} />
            </TabsContent>
            <TabsContent value="genai">
              <GenAIZone />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      <Card className="p-4">
        <SourcesList sources={sources} />
      </Card>
    </div>
  );
}
