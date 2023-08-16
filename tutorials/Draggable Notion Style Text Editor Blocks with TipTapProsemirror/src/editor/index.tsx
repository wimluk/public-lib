"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Extensions from "./extensions";
import Props from "./props";

const Editor: React.FC = () => {
  const editor = useEditor({
    extensions: Extensions,
    editorProps: Props,
    content: `
    <div data-type="rootblock">
      <h1>H1</h1>
    </div>
    <div data-type="rootblock">
      <h2>H2</h2>
    </div>
    <div data-type="rootblock">
      <h3>H3</h3>
    </div>
    <div data-type="rootblock">
      <p>Hello, this is a custom document structure!</p>
    </div>
  `,
  });

  return (
    <div className="min-h-screen w-full">
      <EditorContent editor={editor!} />
    </div>
  );
};

export default Editor;
