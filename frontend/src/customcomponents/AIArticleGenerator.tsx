import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { api } from "@/lib/api"

export function AIGeneratorPage() {
  const [prompt, setPrompt] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setProgress(0)
    setTimeout(() => {
      setGeneratedContent("<p>This is the generated article content based on the prompt.</p>")
      setProgress(100)
      setIsGenerating(false)
    }, 2000) // Simulate content generation
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Article Generator</h1>
      <div className="max-w-3xl mx-auto">
        <Textarea
          placeholder="Enter your idea or topic..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-4"
          rows={5}
        />
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-muted-foreground">
            {prompt.length} / 500 characters
          </span>
          <Button onClick={handleGenerate} disabled={isGenerating || prompt.length === 0}>
            Generate Article
          </Button>
        </div>
        {isGenerating && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground text-center">
              Generating your article... {progress}%
            </p>
          </div>
        )}
        {generatedContent && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Generated Content</h2>
            <div className="prose max-w-none">
              {generatedContent}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
