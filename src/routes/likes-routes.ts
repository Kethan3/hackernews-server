import { Hono } from "hono";
import { tokenMiddleware } from "./middlewares/token-middleware";

export const likesRoutes = new Hono();

likesRoutes.get("/on/:postId", tokenMiddleware, async (context) => {
  const postId = context.req.param("postId");

});

likesRoutes.post("/on/:postId",tokenMiddleware,async (context)=>{
    const postId = context.req.param("postId");
});

likesRoutes.delete("/on/:postId",tokenMiddleware,async (context)=>{
    const postId = context.req.param("postId");

});