import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div style={{ minHeight: "200px", maxHeight: "600px" }}>
      <ReactQuill
        value={value}
        onChange={onChange}
        style={{
          height: "100%",
          minHeight: "200px",
          maxHeight: "600px",
          overflowY: "auto",
        }}
      />
    </div>
  );
};

export default RichTextEditor;
