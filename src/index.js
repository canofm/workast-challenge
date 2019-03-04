require("@babel/register");
require("@babel/polyfill");
import http from "http";
import app from "./server";
import config from "./config";
import logger from "./logger";

const server = http.createServer(app);

server.listen(config.port, () => logger.info(`Server listing on port ${config.port}`));

process.on("SIGINT", () => {
  server.close(() => {
    logger.info("Server down.");
  });
});
