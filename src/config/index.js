import { merge } from "lodash";

const env = process.env.NODE_ENV || "development";

const baseConfig = {
  port: process.env.PORT || 3000,
  db: {
    url: "mongodb://localhost/workast-articles"
  },
  api: {
    baseUri: "/api/v0",
    token: "aToken"
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
