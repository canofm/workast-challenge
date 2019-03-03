import config from "../../../config";
import { AuthorizationRequiredException } from "../../../exceptions";
import Auth from "./auth";

class ApiKeyAuth extends Auth {
  constructor(appConfig = config) {
    super("apikey", appConfig);
  }

  authorizate(resolve, reject, token) {
    if (token != this.appConfig.api.token) {
      reject(new AuthorizationRequiredException());
    }
    resolve();
  }
}

export default ApiKeyAuth;
