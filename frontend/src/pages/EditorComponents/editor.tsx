import { useState } from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export function Editor() {
  const [content, setContent] = useState("");

  return (
    <div className="h-[600px] overflow-y-auto">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        className="h-[550px]"
      />
    </div>
  );
}
