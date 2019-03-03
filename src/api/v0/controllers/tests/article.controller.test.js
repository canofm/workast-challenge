import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import mongoose from "mongoose";
import app from "../../../../server";
import config from "../../../../config";
import { cleanDb } from "../../../../test_helpers";
import UserAPIFactory from "../../factories/user.api.factory";
import { PropertyRequiredException, EntityNotFoundException } from "../../../../exceptions";
import { createFixture } from "../../../../test_helpers/fixture";

chai.use(chaiHttp);
const request = () => chai.request(app);
const articleURI = `${config.api.baseUri}/articles`;
const userRepository = UserAPIFactory.getRepository();

describe("Article API", () => {
  afterEach(async () => await cleanDb());

  describe("on POST /articles", () => {
    beforeEach(async () => await cleanDb());

    it("should returns 201 with the article just created", async () => {
      const { id: userId } = await userRepository.create({ name: "aName" });
      const article = { userId, title: "aTitle", text: "aText", tags: ["tag0", "tag1"] };

      const { body: articleCreated, ...res } = await request()
        .post(articleURI)
        .set("authorization", `APIKey ${config.api.token}`)
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
        .set("authorization", `APIKey ${config.api.token}`)
        .send(article);

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      const { message } = new PropertyRequiredException("Article", "title");
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
    });
  });

  describe("on PUT /articles/:id", () => {
    let article;

    beforeEach(async () => {
      await cleanDb();
      [article] = await createFixture({ users: { q: 1 }, articles: { qPerUser: () => 1 } });
    });

    it("should returns 200 with the article updated", async () => {
      const res = await request()
        .put(`${articleURI}/${article.id}`)
        .set("authorization", `APIKey ${config.api.token}`)
        .send({ title: "newTitle" });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.title).to.be.eql("newTitle");
    });

    it("should returns 400 if a required property is missed", async () => {
      const { body: error, res } = await request()
        .put(`${articleURI}/${article.id}`)
        .set("authorization", `APIKey ${config.api.token}`)
        .send({ title: "" });

      expect(res).to.have.status(400);
      expect(res).to.be.json;
      const { message } = new PropertyRequiredException("Article", "title");
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
    });

    it("should returns 404 if the article didn't exists", async () => {
      const articleId = mongoose.Types.ObjectId().toString();
      const { body: error, res } = await request()
        .put(`${articleURI}/${articleId}`)
        .set("authorization", `APIKey ${config.api.token}`);

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      const { message } = new EntityNotFoundException("Article", articleId);
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
    });
  });

  describe("on DELETE /articles/:id", () => {
    beforeEach(async () => await cleanDb());

    it("should returns 204 when article did exists", async () => {
      const [article] = await createFixture({ users: { q: 1 }, articles: { qPerUser: () => 1 } });
      const res = await request()
        .delete(`${articleURI}/${article.id}`)
        .set("authorization", `APIKey ${config.api.token}`);

      expect(res).to.have.status(204);
    });

    it("should returns 404 when article didn't exists", async () => {
      const idThatDidntExists = mongoose.Types.ObjectId().toString();
      const { body: error, res } = await request()
        .delete(`${articleURI}/${idThatDidntExists}`)
        .set("authorization", `APIKey ${config.api.token}`);

      expect(res).to.have.status(404);
      expect(res).to.be.json;
      const { message } = new EntityNotFoundException("Article", idThatDidntExists);
      expect(error.text).to.be.eql(message.text);
      expect(error.type).to.be.eql(message.type);
    });
  });

  describe("on GET /articles", () => {
    beforeEach(async () => {
      await cleanDb();
      await createFixture({ users: { q: 3 }, articles: { qPerUser: () => 3 } });
    });

    it("without queryparams should returns 200 with all articles", async () => {
      const { body, res } = await request()
        .get(articleURI)
        .set("authorization", `APIKey ${config.api.token}`);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.length).to.be.eql(9);
    });

    it("?tagId=tag0,tag1 should returns 200 with all articles that own at least one of those tags", async () => {
      const { body, res } = await request()
        .get(articleURI)
        .set("authorization", `APIKey ${config.api.token}`)
        .query({ tagId: "tag0,tag1" });

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.length).to.be.eql(6);
    });

    it("?tagId=tag0&tagId=tag1 should returns 200 with all articles that own at least one of those tags", async () => {
      const { body, res } = await request()
        .get(articleURI)
        .set("authorization", `APIKey ${config.api.token}`)
        .query("tagId=tag0&tagId=tag1");

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(body.length).to.be.eql(6);
    });
  });
});
