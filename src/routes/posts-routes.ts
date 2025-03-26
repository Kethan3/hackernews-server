import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";
import { getAllPosts } from "../controllers/posts/posts-controller";

export const postsRoutes = new Hono();

postsRoutes.get("/me", async (context) => {


});

postsRoutes.get("",tokenMiddleware, async () =>{

    const posts = await getAllPosts();
    
})