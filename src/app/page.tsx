import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-gray-200 px-8 pt-32">
      <h1 className="max-w-7xl border-b-4 border-r-4 border-t-4 border-primary py-8 pr-4 text-4xl font-semibold sm:text-6xl md:text-7xl lg:text-8xl">
        Welcome to our Notion-style Webapp with a WYSIWYG editor.
      </h1>
      <div className="mt-8 flex gap-4">
        {!userId ? (
          <>
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/sign-up"
            >
              Sign-up
            </Link>
            <Link
              className={buttonVariants({ variant: "default" })}
              href="/sign-in"
            >
              Sign-in
            </Link>
          </>
        ) : (
          <Link className={buttonVariants({ variant: "default" })} href="/app">
            Go to App
          </Link>
        )}
      </div>
    </main>
  );
}
