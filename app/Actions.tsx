"use client";

import { GitHubIcon } from "@/components/Icons";
import { signIn, signOut } from "next-auth/react";

export function SignOut() {
  return (
    <button
      className="mt-2 mb-6 text-xs text-white hover:text-[hsl(280,100%,70%)]"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signOut()}
    >
      → Sign out
    </button>
  );
}

export function SignIn() {
  return (
    <button
      className="mb-4 flex rounded-md border border-gray-800 bg-black px-4 py-3 text-sm font-semibold text-neutral-200 transition-all hover:text-white"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onClick={() => signIn("github")}
    >
      <GitHubIcon />
      <div className="ml-3">Sign in with GitHub</div>
    </button>
  );
}
