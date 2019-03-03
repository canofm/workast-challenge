import express from "express";
import ArticleAPIFactory from "../factories/article.api.factory";

const articleController = ArticleAPIFactory.getController();

export const ArticleRouter = express.Router();

ArticleRouter.route("/")
  .post((req, res, next) => articleController.create(req, res, next))
  .get((req, res, next) => articleController.getAll(req, res, next));

ArticleRouter.route("/:id")
  .put((req, res, next) => articleController.update(req, res, next))
  .delete((req, res, next) => articleController.remove(req, res, next));
