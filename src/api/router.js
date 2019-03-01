import express from "express";
import { ErrorHandler } from "./error.handler";
import { UserRouter } from "./routers/user.router";
import { ArticleRouter } from "./routers/article.router";

export const router = express.Router();

// routes
router.use("/users", UserRouter);
router.use("/articles", ArticleRouter);
router.use(ErrorHandler);
