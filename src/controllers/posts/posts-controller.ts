import { prismaClient } from "../../extras/prisma";
import type { GetAllPostsResult } from "./posts-types";

export const getAllPosts = async () : Promise<GetAllPostsResult> => {
  const posts = await prismaClient.post.findMany();
  
  return {
    posts,
  }
};
