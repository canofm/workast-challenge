import { merge } from "lodash";
require("dotenv").config();

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  port: process.env.PORT || 3000,
  db: {
    url: process.env.CONNECTION_STRING || "mongodb://localhost/workast-articles"
  },
  api: {
    baseUri: process.env.API_SUFFIX || "/api/v0",
    token: process.env.SECRET_TOKEN || "aToken"
  }
};

let envConfig = {};

switch (env) {
  case "development":
  case "dev":
    envConfig = require("./development").config;
    break;
  case "prod":
  case "production":
    envConfig = require("./production").config;
    break;
  default:
    envConfig = require("./development").config;
}

export default merge(baseConfig, envConfig);
