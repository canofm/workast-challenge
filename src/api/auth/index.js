import BasicAuth from "./basic.auth";

export const authMiddleware = config => async (req, res, next) => {
  const authStrategy = new BasicAuth(config);
  authStrategy
    .auth(req.headers["authorization"])
    .then(() => next())
    .catch(err => next(err));
};
