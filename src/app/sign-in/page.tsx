import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <SignIn afterSignInUrl="/" />
    </main>
  );
}
