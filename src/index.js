require("@babel/register");
require("@babel/polyfill");
import http from "http";
import app from "./server";
import config from "./config";

const server = http.createServer(app);

// TODO: this should log only in prod/dev, but not in testing
server.listen(
  config.port,
  () => console.log(`Server listing on port ${config.port}`) /* eslint-disable-line no-console */
);

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Server down."); /* eslint-disable-line no-console */
  });
});
