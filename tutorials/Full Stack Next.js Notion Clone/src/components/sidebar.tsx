import CreateDocButton from "./create-doc-button";
import DocumentCard from "./document-card";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ScrollArea } from "./ui/scroll-area";

export type DocumentType = {
  publicId: string;
  title: string;
};

// Fetch documents of current user from database
async function getDocuments(ownerId: string) {
  return await prisma.documents.findMany({
    where: {
      ownerId: ownerId,
    },
    select: {
      publicId: true,
      title: true,
    },
  });
}

export default async function Sidebar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const documents = await getDocuments(userId);
  return (
    <aside className="fixed left-0 top-0 flex w-72 flex-col bg-gray-200">
      <ScrollArea className="flex h-screen w-full flex-col items-start justify-start">
        <CreateDocButton />
        {documents.map((document, index) => (
          <DocumentCard key={index} document={document} />
        ))}
      </ScrollArea>
    </aside>
  );
}
