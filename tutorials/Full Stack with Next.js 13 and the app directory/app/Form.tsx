"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Form() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsFetching(true);

    const form = e.currentTarget;
    const input = form.elements.namedItem("entry") as HTMLInputElement;

    const res = await fetch("/api/posts", {
      body: JSON.stringify({
        title: input.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    input.value = "";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { error } = await res.json();
    console.log(error);

    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <form
      style={{ opacity: !isMutating ? 1 : 0.7 }}
      className="relative max-w-[500px] text-sm"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit}
    >
      <input
        aria-label="Your message"
        placeholder="Your message..."
        disabled={isPending}
        name="entry"
        type="text"
        required
        className="mt-1 block w-full rounded-md border-neutral-300 bg-gray-100 py-3 pl-4 pr-32 text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:text-neutral-100"
      />
      <button
        className="absolute right-1 top-2 flex h-9 w-16 items-center justify-center rounded bg-neutral-200 px-2 py-1 font-medium text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
        disabled={isMutating}
        type="submit"
      >
        Send
      </button>
    </form>
  );
}
