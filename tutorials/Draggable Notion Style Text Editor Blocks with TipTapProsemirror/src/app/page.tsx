import Editor from "@/editor";

export default function Home() {
  return (
    <main className="min-h-screen w-full py-16">
      <div className="mx-auto flex cursor-text flex-col gap-2">
        <Editor />
      </div>
    </main>
  );
}
