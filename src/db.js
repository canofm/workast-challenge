import mongoose from "mongoose";
import appConfig from "./config";

// Setting bluebird as promise library to mongoose
mongoose.Promise = require("bluebird");

export const connect = (config = appConfig) => {
  return mongoose.connect(config.db.url, { useNewUrlParser: true, useCreateIndex: true });
};
