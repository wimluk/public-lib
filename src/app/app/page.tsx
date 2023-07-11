"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { TipTapEditorExtensions } from "@/components/editor/extensions";
import { TipTapEditorProps } from "@/components/editor/props";

export default function App() {
  const defaultEditor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    content: "",
  });
  return (
    <div
      onClick={() => {
        defaultEditor?.chain().focus().run();
      }}
      className="relative flex min-h-screen w-full cursor-text flex-col items-center p-32"
    >
      <div className=" w-full max-w-screen-lg">
        <h1 className="mb-4 text-6xl font-bold">
          Introducing our awesome Editor!
        </h1>
        <p className="mb-2">
          Check out the features below or create a new document to get started.
          You can either use the {"/"} command or try the markdown shortcuts,
          which make it easy to format the text while typing.
        </p>
        <p className="mb-8">
          To test that, start a new line and type # followed by a space to get a
          heading. Try #, ##, ###, ####, #####, ###### for different levels.
          Those conventions are called input rules in tiptap. Some of them are
          enabled by default. Try {">"} for blockquotes, *, - or + for bullet
          lists, `foobar` to highlight code or ~~tildes~~ to strike text.
        </p>
        <EditorContent editor={defaultEditor} />
      </div>
    </div>
  );
}
