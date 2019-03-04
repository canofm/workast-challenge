import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { cleanDb } from "../../../../test_helpers";
import app from "../../../../server";
import config from "../../../../config";
import { User } from "../../../../domain";
import { PropertyRequiredException } from "../../../../exceptions";
import { console } from "../../../../logger";

chai.use(chaiHttp);
const request = () => chai.request(app);
const userURI = `${config.api.baseUri}/users`;

describe("User API", () => {
  describe("on POST", () => {
    beforeEach(async () => await cleanDb());
    afterEach(async () => await cleanDb());

    it("should returns 201 with the user just created", async () => {
      const user = new User.Builder().name("aName").build();
      const res = await request()
        .post(userURI)
        .set("authorization", `APIKey ${config.api.token}`)
        .send(user);

      expect(res).to.have.status(201);
      expect(res).to.be.json;

      const { body } = res;
      expect(body.name).to.be.eql(user.name);
      expect(body.id).to.not.be.empty;
    });

    it("when body sent is incomplete, it shoulds return 400", async () => {
      console.silent = true;
      const res = await request()
        .post(userURI)
        .set("authorization", `APIKey ${config.api.token}`)
        .send({ avatar: "http://anUrl.com/images/anAvatar" });

      expect(res).to.have.status(400);
      const error = JSON.parse(res.error.text);
      const errorExpected = new PropertyRequiredException("User", "name").message;
      expect(error.type).to.be.eql(errorExpected.type);
      console.silent = false;
    });
  });
});
