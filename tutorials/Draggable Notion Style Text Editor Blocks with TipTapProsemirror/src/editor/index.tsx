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
      <p>Hello, this is a custom document structure!</p>
    </div>
`,
  });

  return <EditorContent editor={editor!} />;
};

export default Editor;
