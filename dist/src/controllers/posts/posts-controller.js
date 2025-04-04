import { prismaClient } from "../../extras/prisma";
import { createPostError, } from "./posts-types";
export const getMePosts = async (parameters) => {
    const posts = await prismaClient.post.findMany({
        where: {
            userId: parameters.userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return {
        posts,
    };
};
export const getAllPosts = async (parameters) => {
    const limit = 10;
    const offset = (parameters.page - 1) * limit;
    const posts = await prismaClient.post.findMany({
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
    });
    return { posts };
};
export const createPost = async (parameters) => {
    try {
        const newPost = await prismaClient.post.create({
            data: {
                userId: parameters.userId,
                title: parameters.title,
                description: parameters.description,
                content: parameters.content,
            },
        });
        return { newPost };
    }
    catch (e) {
        throw createPostError.UNKNOWN;
    }
};
export const deletePost = async (parameters) => {
    const post = await prismaClient.post.findUnique({
        where: {
            id: parameters.postId,
        },
    });
    if (!post || post.userId != parameters.userId) {
        throw new Error("Unauthorized to delete this post");
    }
    await prismaClient.post.delete({
        where: {
            id: parameters.postId,
        },
    });
};
