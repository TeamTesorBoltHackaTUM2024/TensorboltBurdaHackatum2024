// src/components/RichTextEditor.tsx
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<Props> = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} />;
};

export default RichTextEditor;
