import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../documentation/swagger.json";

export const ApiDocsRouter = express.Router();

ApiDocsRouter.use("/", swaggerUi.serve);
ApiDocsRouter.get("/", swaggerUi.setup(swaggerSpec));
