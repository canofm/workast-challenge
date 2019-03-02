import config from "../../config";
import { AuthorizationRequiredException } from "../../exceptions";
import Auth from "./auth";

class BasicAuth extends Auth {
  constructor(appConfig = config) {
    super("Basic", appConfig);
  }

  _auth(resolve, reject, token) {
    if (token != this.appConfig.api.token) {
      reject(new AuthorizationRequiredException());
    }
    resolve();
  }
}

export default BasicAuth;
