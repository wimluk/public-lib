import { SignIn, SignOut } from "./Actions";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/server/auth";
import Image from "next/image";
import Form from "./Form";
import { prisma } from "@/server/db";
import Delete from "./Delete";
import { type Session } from "next-auth";

async function getPosts() {
  const data = await prisma.posts.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
}

export default async function Home() {
  let session: Session | null | undefined;
  let posts;

  try {
    const [postsRes, sessionRes] = await Promise.allSettled([
      getPosts(),
      getServerSession(authOptions),
    ]);

    if (postsRes.status === "fulfilled" && postsRes.value[0]) {
      posts = postsRes.value;
    } else {
      console.error(postsRes);
    }

    if (sessionRes.status === "fulfilled") {
      session = sessionRes.value;
    } else {
      console.error(sessionRes);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-10 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Our <span className="text-[hsl(280,100%,70%)]">BLOG</span> App
          </h1>
          <div className="flex flex-col items-center justify-center gap-1">
            {session?.user ? (
              <>
                <Image
                  className="w-14 rounded-full"
                  width={64}
                  height={64}
                  src={session.user.image as string}
                  alt={session.user.name as string}
                />
                <SignOut />
                <Form />
              </>
            ) : (
              <SignIn />
            )}
          </div>
          <div className="flex max-w-md flex-col items-center justify-center gap-5">
            {posts?.map((post) => (
              <div
                key={post.id}
                className="flex flex-row items-center justify-center gap-2"
              >
                <h2 className="text-sm">{post.author?.name}:</h2>
                <p className="break-all text-sm font-bold">{post.title}</p>
                {session?.user.email === post.author?.email && (
                  <Delete id={post.id} />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
