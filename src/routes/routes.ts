import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes.js";
import { usersRoutes } from "./users-routes.js";
import { postsRoutes } from "./posts-routes.js";
import { likesRoutes } from "./likes-routes.js";
import { commentsRoutes } from "./comments-routes.js";
import { openapi } from "../docs/openapi.js";
import { swaggerUI } from "@hono/swagger-ui";

export const allRoutes = new Hono();

allRoutes.route("/auth", authenticationRoutes);
allRoutes.route("/users", usersRoutes);
allRoutes.route("/posts", postsRoutes);
allRoutes.route("/likes", likesRoutes);
allRoutes.route("/comments", commentsRoutes);

allRoutes.get("/doc", (c) => c.json(openapi));
allRoutes.get("/ui", swaggerUI({ url: "/doc" }));
