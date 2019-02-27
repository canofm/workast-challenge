import express from "express";
import UserAPIFactory from "../factories/user.api.factory";

const userController = UserAPIFactory.getController();

export const UserRouter = express.Router();

UserRouter.route("/").post((req, res, next) => userController.create(req, res, next));
