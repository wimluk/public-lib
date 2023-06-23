import Editor from "@/components/editor";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

type DocumentProps = {
  params: {
    publicId: string;
  };
};

// Fetch the document from the Database.
async function getDocument(publicId: string, ownerId: string) {
  return await prisma.documents.findFirst({
    where: {
      publicId: publicId,
      ownerId: ownerId,
    },
    select: {
      title: true,
      document: true,
    },
  });
}

export default async function DocumentPage(props: DocumentProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const document = await getDocument(props.params.publicId, userId);

  if (!document) {
    notFound();
  }

  return (
    <Editor
      publicId={props.params.publicId}
      document={{
        title: document.title,
        document: document.document,
      }}
    />
  );
}
