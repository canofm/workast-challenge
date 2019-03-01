import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../server";
import config from "../../../config";
import { cleanDb } from "../../../test_helpers";
import UserAPIFactory from "../../factories/user.api.factory";
import { PropertyRequiredException } from "../../../exceptions";

chai.use(chaiHttp);
const request = () => chai.request(app);
const articleURI = `${config.api.baseUri}/articles`;
const userRepository = UserAPIFactory.getRepository();

describe("Article API", () => {
  describe("on POST", () => {
    beforeEach(async () => await cleanDb());
    afterEach(async () => await cleanDb());

    it("should returns 201 with the article just created", async () => {
      const { id: userId } = await userRepository.create({ name: "aName" });
      const article = { userId, title: "aTitle", text: "aText", tags: ["tag0", "tag1"] };

      const { body: articleCreated, ...res } = await request()
        .post(articleURI)
        .send(article);

      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(JSON.stringify(articleCreated.userId)).to.be.eql(JSON.stringify(article.userId));
      expect(articleCreated.title).to.be.eql(article.title);
      expect(articleCreated.text).to.be.eql(article.text);
      expect(articleCreated.tags).to.be.eql(article.tags);
      expect(articleCreated.id).to.exist;
    });

    it("should returns 400 if a required property is missed", async () => {
      const { id: userId } = await userRepository.create({ name: "aName" });
      const article = { userId, text: "aText", tags: ["tag0", "tag1"] };

      const { body: error, res } = await request()
        .post(articleURI)
        .send(article);

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      const { message } = new PropertyRequiredException("Article", "title");
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
    });
  });

  describe("on PUT", () => {
    it("should returns 200 with the article updated", () => {});

    it("should returns 400 if a required property is missed", () => {});

    it("should returns 404 if the article didn't exists", () => {}); // Quiet sure that I can't test this due to findOneAndUpdate didn't tell about the reason of failling
  });

  describe("on DELETE", () => {
    it("should returns 204 when article did exists", () => {});

    it("should returns 404 when article didn't exists", () => {});
  });

  describe("on GET /getall", () => {
    it("without queryparams should returns 200 with all articles", () => {});

    it("with tags as queryparam separed by commas should returns 200 with all articles that own at least one of those tags", () => {});

    it("with tags as repeating the same queryparam should returns 200 with all articles that own at least one of those tags", () => {});
  });
});
