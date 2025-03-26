import type { Post } from "@prisma/client";

export type GetMePostsResult = {
  post : Post;
};

export type GetAllPostsResult = {
  posts: Post[];
};
