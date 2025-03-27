import { prismaClient } from "../../extras/prisma";
import type { getPostsResult } from "./posts-types";

export const getMePosts = async (parameters: {
  userId: string;
}): Promise<getPostsResult> => {
  const posts = await prismaClient.post.findMany({
    where: {
      id: parameters.userId,
    },
  });

  return {
    posts,
  };
};

export const getAllPosts = async (parameters: {
  page: number;
}): Promise<getPostsResult> => {
  const limit = 10;
  const offset = (parameters.page - 1) * limit;

  const posts = await prismaClient.post.findMany({
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });

  return { posts };
};


export const 