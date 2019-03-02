import Promise from "bluebird"; //I'm just using the Promise from bluebird for the typified catch
import { AuthorizationRequiredException } from "../../exceptions";

/**
 * The idea behind this design is to have several polymorphic auth strategies in a chain of responsibility pattern.
 * Due to some strategies such as Bearer are asynchronous then strategies must be asynchronic.
 * Maybe this design is overkill to the challenge required,
 * but I think that this a cost I could afford in order to gain extensibility and flexibility,
 * also testbility and readibility in the perspective of the own auth strategy.
 */

class Auth {
  constructor(method, config) {
    this.method = method;
    this.appConfig = config;
  }

  setSuccessor(successor) {
    this.successor = successor;
  }

  auth(credentials) {
    return new Promise((resolve, reject) => {
      if (!credentials) {
        reject(new AuthorizationRequiredException());
      }
      const [method, token] = credentials.split(" ");
      this._authChain(resolve, reject, method, token);
    });
  }

  _authChain(resolve, reject, method, token) {
    if (method === this.method) {
      this.authorizate(resolve, reject, token);
    } else {
      if (this.successor) {
        this.successor.authorizate(resolve, reject, token);
      } else {
        reject(new AuthorizationRequiredException());
      }
    }
  }

  //eslint-disable-next-line
  authorizate(resolve, reject, token) {
    throw new Error("must implement this method");
  }
}

export default Auth;
