import express from "express";
import { ErrorHandler } from "./error.handler";
import { UserRouter } from "./v0/routers/user.router";
import { ArticleRouter } from "./v0/routers/article.router";
import { ApiDocsRouter } from "./v0/routers/api.docs.router";
import { authMiddleware } from "./v0/auth";
import config from "../config";

export const router = express.Router();

// Don't need authentication for reading the spec
router.use("/api-docs", ApiDocsRouter);

router.use(authMiddleware(config));
router.use("/users", UserRouter);
router.use("/articles", ArticleRouter);
router.use(ErrorHandler);
