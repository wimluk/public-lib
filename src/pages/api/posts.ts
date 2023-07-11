import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session || !session.user) {
    return res.status(403).send("Unauthorized");
  }

  const id = session.user.id;

  if (req.method === "POST") {
    await prisma.posts.create({
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        title: req.body.title,
        authorId: id,
      },
    });

    return res.status(200).json({ error: null });
  }

  if (req.method === "DELETE") {
    await prisma.posts.delete({
      where: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        id: req.body.id,
      },
    });

    return res.status(204).end();
  }

  return res.send("Method not allowed.");
}
