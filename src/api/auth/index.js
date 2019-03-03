import ApiKeyAuth from "./apikey.auth";

export const authMiddleware = config => async (req, res, next) => {
  const authStrategy = new ApiKeyAuth(config);
  authStrategy
    .auth(req.headers["authorization"])
    .then(() => next())
    .catch(err => next(err));
};
