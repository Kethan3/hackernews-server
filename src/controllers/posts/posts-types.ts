import type { Post } from "@prisma/client"

export type GetMePosts = {
    post : Post;
   
}

export type GetMeAllPosts ={
    posts : Post[];
}