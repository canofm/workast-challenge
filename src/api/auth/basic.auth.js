import config from "../../config";
import { AuthorizationRequiredException } from "../../exceptions";
import Promise from "bluebird"; //I'm just using the Promise from bluebird for the typified catch

class BasicAuth {
  constructor(appConfig = config) {
    this.appConfig = appConfig;
  }

  auth(authorization) {
    return new Promise((resolve, reject) => {
      if (!authorization) {
        reject(new AuthorizationRequiredException());
      }
      const [method, token] = authorization.split(" ");
      if (method === "Basic" && token != this.appConfig.api.token) {
        reject(new AuthorizationRequiredException());
      }
      resolve();
    });
  }
}

export default BasicAuth;
