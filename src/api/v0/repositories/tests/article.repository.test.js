import { expect } from "chai";
import mongoose from "mongoose";
import ArticleAPIFactory from "../../factories/article.api.factory";
import UserAPIFactory from "../../factories/user.api.factory";
import { PropertyRequiredException, EntityNotFoundException } from "../../../../exceptions";
import { createFixture } from "../../../../test_helpers/fixture";
import { cleanDb } from "../../../../test_helpers";

const articleRepository = ArticleAPIFactory.getRepository();
const userRepository = UserAPIFactory.getRepository();

describe("ArticleRepository", () => {
  let user, article;

  beforeEach(async () => {
    user = await userRepository.create({ name: "aName" });
    article = {
      userId: user.id,
      title: "aTitle",
      text: "aText",
      tags: ["aTag"]
    };

    await cleanDb();
  });

  afterEach(async () => await cleanDb());

  describe("on create", () => {
    it("should returns the article just created", async () => {
      const articleCreated = await articleRepository.create(article);

      expect(articleCreated.userId).to.be.eql(article.userId);
      expect(articleCreated.title).to.be.eql(article.title);
      expect(articleCreated.text).to.be.eql(article.text);
      expect(articleCreated.tags).to.be.eql(article.tags);
      expect(articleCreated.id).to.exist;
    });

    it("should throws a PropertyRequiredException if the object given miss a required property", () => {
      const create = () => articleRepository.create({ title: "aTitle" });

      expect(create).to.throw(PropertyRequiredException);
    });
  });

  describe("on update", () => {
    let newArticle;
    beforeEach(async () => (newArticle = await articleRepository.create(article)));
    afterEach(async () => await cleanDb());

    it("if the article is has all required properties, should update it and returns the updated article", async () => {
      const title = "newTitle";
      const updatedArticle = await articleRepository.update(newArticle.id, { title });

      expect(updatedArticle.title).to.be.eql(title);
      expect(updatedArticle.userId).to.be.eql(newArticle.userId);
      expect(updatedArticle.text).to.be.eql(newArticle.text);
      expect(updatedArticle.tags).to.be.eql(newArticle.tags);
    });

    it("when trying to update an article that didn't exists", done => {
      const randomArticleId = mongoose.Types.ObjectId();

      articleRepository.update(randomArticleId, { title: "otherTitle" }).catch(() => done());
    });

    it("when trying to update an article with an userId that didn't exists", done => {
      const randomUserId = mongoose.Types.ObjectId();

      articleRepository
        .update(article.id, { title: "otherTitle", userId: randomUserId })
        .catch(() => done());
    });

    it("when trying to update an article with required property empty", done => {
      articleRepository.update(article.id, { title: "" }).catch(() => done());
    });
  });

  describe("on remove", () => {
    let newArticle;
    beforeEach(async () => (newArticle = await articleRepository.create(article)));
    afterEach(async () => await cleanDb());

    it("if the article exists, should remove it", done => {
      articleRepository.remove(newArticle.id).then(() => done());
    });

    it("try to remove an article that didn't exists", done => {
      articleRepository
        .remove(mongoose.Types.ObjectId())
        .catch((EntityNotFoundException, () => done()));
    });
  });

  describe("on getAll", () => {
    beforeEach(
      async () =>
        await createFixture({
          users: { q: 3 },
          articles: { qPerUser: () => 3 }
        })
    );
    afterEach(async () => await cleanDb());

    it("should returns an array with all articles that contains the tags selected", async () => {
      const tags = ["tag0", "tag1"];
      const results = await articleRepository.getAll(tags);
      expect(results.total).to.be.eql(6);
    });

    it("should returns an empty array if the tags passed don't match with any the articles", async () => {
      const tags = ["tag10", "tag12"];
      const results = await articleRepository.getAll(tags);
      expect(results.total).to.be.eql(0);
    });

    it("should returns an array with all articles if tags's filter is empty", async () => {
      const results = await articleRepository.getAll();
      expect(results.total).to.be.eql(9);
    });
  });
});
