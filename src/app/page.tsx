import ClientSection from "./ClientSection";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-8 text-center">
      <h1 className="my-4 text-6xl font-bold">My GPT App</h1>
      <div className="flex flex-col items-center gap-2 font-mono md:flex-row">
        <div className="bg-neuborder-neutral-900 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 dark:bg-white">
          <div className="text-2xl text-neutral-50 dark:text-neutral-900">
            1
          </div>
        </div>
        <p className="font-bold">
          Ask a question.
          <span className="text-neutral-400">(Max. 200 characters)</span>
        </p>
      </div>
      <ClientSection />
    </main>
  );
}
