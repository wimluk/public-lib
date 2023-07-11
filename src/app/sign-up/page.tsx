import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-200">
      <SignUp
        afterSignUpUrl="/app"
        appearance={{ variables: { colorPrimary: "#000" } }}
      />
    </main>
  );
}
