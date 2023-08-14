import Editor from "@/editor";

export default function Home() {
  return (
    <main className="min-h-screen w-full p-8">
      <div className="mx-auto flex max-w-4xl cursor-text flex-col gap-2">
        <Editor />
      </div>
    </main>
  );
}
