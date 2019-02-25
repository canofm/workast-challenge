import express from "express";
import { ErrorHandler } from "./errorHandler";

export const router = express.Router();

// routes

router.use(ErrorHandler);
