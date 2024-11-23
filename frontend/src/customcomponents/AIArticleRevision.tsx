import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Version {
  id: number;
  date: string;
  editor: string;
  changes: string;
}

export function AIArticleRevision() {
  const [originalContent, setOriginalContent] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [versions, setVersions] = useState<Version[]>([]);

  const handleSaveVersion = () => {
    const newVersion: Version = {
      id: versions.length + 1,
      date: new Date().toISOString(),
      editor: "AI Editor",
      changes: "Content revised",
    };
    setVersions([newVersion, ...versions]);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Article Revision</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-2">Original Content</h3>
          <Textarea
            value={originalContent}
            onChange={(e) => setOriginalContent(e.target.value)}
            className="h-64"
            placeholder="Paste original content here..."
          />
        </div>
        <div>
          <h3 className="font-semibold mb-2">Edited Content</h3>
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="h-64"
            placeholder="Edit content here..."
          />
        </div>
      </div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleSaveVersion}>Save Version</Button>
      </div>
      <h3 className="font-semibold mb-2">Version History</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Version</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Editor</TableHead>
            <TableHead>Changes</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {versions.map((version) => (
            <TableRow key={version.id}>
              <TableCell>{version.id}</TableCell>
              <TableCell>{new Date(version.date).toLocaleString()}</TableCell>
              <TableCell>{version.editor}</TableCell>
              <TableCell>{version.changes}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
