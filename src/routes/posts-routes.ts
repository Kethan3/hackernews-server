import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { getAllPosts } from "../controllers/posts/posts-controller";

export const postsRoutes = new Hono();

postsRoutes.get("/me", async (context) => {});

postsRoutes.get("", tokenMiddleware, async (context) => {
  const posts = await getAllPosts();
  if (!posts) {
    return context.json({
      message: "No posts found",
    });
  }
  return context.json({
    posts,
  });
});
