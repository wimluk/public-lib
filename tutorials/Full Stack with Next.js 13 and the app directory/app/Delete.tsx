"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function Delete({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  async function onClick() {
    setIsFetching(true);

    await fetch("/api/posts", {
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <button
      className="text-sm text-red-500 opacity-0 transition hover:opacity-100"
      disabled={isMutating}
      type="button"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={onClick}
    >
      {isMutating ? "Deleting..." : "Delete"}
    </button>
  );
}
