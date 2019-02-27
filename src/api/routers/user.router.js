import express from "express";
import UserAPIFactory from "../factories/user.api.factory";

const userController = UserAPIFactory.get();

export const UserRouter = express.Router();

UserRouter.route("/").post(userController.create);
