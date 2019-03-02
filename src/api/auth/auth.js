import Promise from "bluebird"; //I'm just using the Promise from bluebird for the typified catch
import { AuthorizationRequiredException } from "../../exceptions";

class Auth {
  constructor(method, config) {
    this.method = method;
    this.appConfig = config;
  }

  setSuccessor(successor) {
    this.successor = successor;
  }

  auth(credentials) {
    console.log({ credentials });
    return new Promise((resolve, reject) => {
      if (!credentials) {
        reject(new AuthorizationRequiredException());
      }
      const [method, token] = credentials.split(" ");
      if (method === this.method) {
        return this._auth(resolve, reject, token);
      } else {
        if (this.successor) {
          this.successor._auth(resolve, reject, token);
        } else {
          reject(new AuthorizationRequiredException());
        }
      }
    });
  }

  //eslint-disable-next-line
  _auth(resolve, reject, token) {
    throw new Error("must implement this method");
  }
}

export default Auth;
