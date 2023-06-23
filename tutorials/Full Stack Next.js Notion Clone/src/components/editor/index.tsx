"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useState, useEffect } from "react";
import { TipTapEditorExtensions } from "./extensions";
import { TipTapEditorProps } from "./props";
import { PatchDocType } from "@/app/api/documents/[publicId]/route";
import { useDebouncedCallback } from "use-debounce";

export default function Editor({
  document,
  publicId,
}: {
  document: PatchDocType;
  publicId: string;
}) {
  const [saveStatus, setSaveStatus] = useState<string>("Saved");
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [content, setContent] = useState<PatchDocType["document"]>();

  async function patchRequest(publicId: string, title: string, document: any) {
    try {
      const response = await fetch(`/api/documents/${publicId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          document: document,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update document");
      }

      setSaveStatus("Saved");
    } catch (error) {
      setSaveStatus("Waiting to Save.");
      console.error(error);
    }
  }

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON();
    setContent(json);
    await patchRequest(publicId, document.title, json);
    // Simulate a delay in saving.
    setTimeout(() => {
      setSaveStatus("Saved");
    }, 500);
  }, 1000);

  const editor = useEditor({
    extensions: TipTapEditorExtensions,
    editorProps: TipTapEditorProps,
    onUpdate: (e) => {
      setSaveStatus("Saving...");
      debouncedUpdates(e);
    },
    content: content,
  });

  // Hydrate the editor with the content from the database.
  useEffect(() => {
    if (editor && document && !hydrated) {
      editor.commands.setContent(document.document);
      setHydrated(true);
    }
  }, [editor, document, hydrated]);

  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="relative flex min-h-screen w-full cursor-text flex-col items-center p-32"
    >
      <div className=" w-full max-w-screen-lg">
        <div className="absolute left-8 top-8 rounded-lg bg-gray-100 px-2 py-1 text-sm text-gray-400">
          {saveStatus}
        </div>
        <h1 className="mb-8 text-6xl font-bold">{document.title}</h1>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
