import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

import { authenticationRoutes } from "./authentication-routes";
import { usersRoutes } from "./users-routes";
import { postsRoutes } from "./posts-routes";
import { likesRoutes } from "./likes-routes";
import { commentsRoutes } from "./comments-routes";

import { cors } from "hono/cors";
import { authRoute } from "./middlewares/session-middleware";

export const allRoutes = new Hono();

allRoutes.use(
  cors({
    origin: ["http://localhost:4000"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization", "token"],
  })
);

allRoutes.get("/ui", swaggerUI({ url: "/docs" }));

allRoutes.route("/api/auth", authRoute);
allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);