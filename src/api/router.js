import express from "express";
import { ErrorHandler } from "./error.handler";
import { UserRouter } from "./routers/user.router";
import { ArticleRouter } from "./routers/article.router";
import { ApiDocsRouter } from "./routers/api.docs.router";
import { authMiddleware } from "./auth";
import config from "../config";

export const router = express.Router();

// Don't need authentication for reading the spec
router.use("/api-docs", ApiDocsRouter);

router.use(authMiddleware(config));
router.use("/users", UserRouter);
router.use("/articles", ArticleRouter);
router.use(ErrorHandler);
