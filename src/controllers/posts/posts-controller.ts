import { prismaClient } from "../../extras/prisma";

export const getAllPosts = async () => {
  const posts = await prismaClient.post.findMany();
};
