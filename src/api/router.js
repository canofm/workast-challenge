import express from "express";
import { ErrorHandler } from "./errorHandler";
import { UserRouter } from "./routers/user.router";

export const router = express.Router();

// routes
router.use("/users", UserRouter);
router.use(ErrorHandler);
