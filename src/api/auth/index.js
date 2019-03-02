import BasicAuth from "./basic.auth";

export const auth = config => (req, res, next) => {
  const authStrategy = new BasicAuth(config);
  next(authStrategy.auth(req.headers["authorization"]));
};
