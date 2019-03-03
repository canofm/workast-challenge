import ApiKeyAuth from "../apikey.auth";
import { AuthorizationRequiredException } from "../../../../exceptions";

describe("ApiKey Auth", () => {
  const apiKeyAuth = new ApiKeyAuth({ api: { token: "token" } });

  it("if header and token is correct, then should authorize the request", done => {
    apiKeyAuth.auth("APIKey token").then(() => done());
  });

  it("should raise AuthorizationRequiredException if authorization header is missing", done => {
    apiKeyAuth.auth().catch(AuthorizationRequiredException, () => done());
  });

  it("should raise AuthorizationRequiredException if the token is wrong", done => {
    apiKeyAuth.auth("APIKey otherToken").catch(AuthorizationRequiredException, () => done());
  });
});
