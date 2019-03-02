import BasicAuth from "../basic.auth";
import { AuthorizationRequiredException } from "../../../exceptions";

describe("Basic Auth", () => {
  const basicAuth = new BasicAuth({ api: { token: "token" } });

  it("if header and token is correct, then should authorize the request", done => {
    basicAuth.auth("Basic token").then(() => done());
  });

  it("should raise AuthorizationRequiredException if authorization header is missing", done => {
    basicAuth.auth().catch(AuthorizationRequiredException, () => done());
  });

  it("should raise AuthorizationRequiredException if the token is wrong", done => {
    basicAuth.auth("Basic otherToken").catch(AuthorizationRequiredException, () => done());
  });
});
