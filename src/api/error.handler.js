import logger from "../logger";

// eslint-disable-next-line
export const ErrorHandler = (error, req, res, next) => {
  logger.error(error.stack);
  res.status(error.statusCode || 500).send(error.message || error.toString());
};
