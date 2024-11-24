import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface Source {
  title: string;
  url: string;
  image: string;
}

interface Props {
  sources: Source[];
}

export default function SourcesList({ sources }: Props) {
  const [hoveredSource, setHoveredSource] = useState<Source | null>(null);

  return (
    <ScrollArea className="h-40">
      <div className="flex space-x-4">
        {sources.map((source, index) => (
          <Card
            key={index}
            className="w-40 cursor-pointer"
            onMouseEnter={() => setHoveredSource(source)}
            onMouseLeave={() => setHoveredSource(null)}
            onClick={() => window.open(source.url, "_blank")}
          >
            <CardContent className="p-2">
              <img
                src={source.image}
                alt={source.title}
                className="w-full h-20 object-cover mb-2"
              />
              <p className="text-sm truncate">{source.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      {hoveredSource && (
        <div className="mt-4">
          <h3 className="font-bold">{hoveredSource.title}</h3>
          <p className="text-sm">{hoveredSource.url}</p>
        </div>
      )}
    </ScrollArea>
  );
}
