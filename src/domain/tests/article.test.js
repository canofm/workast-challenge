import { expect } from "chai";
import {
  PropertyRequiredException,
  BuilderException,
  AtLeastOneTagException
} from "../../exceptions";
import Article from "../article";

describe("Article", () => {
  describe("when building", () => {
    const userId = "asdasdadsadasd123";
    const title = "aTitle";
    const text = "aText";
    const tags = ["aTag", "otherTag"];

    it("must be created through builder", () => {
      expect(() => new Article()).to.throw(BuilderException);
    });

    it("must have a userId", () => {
      expect(() =>
        new Article.Builder()
          .title(title)
          .text(text)
          .tags(tags)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must have a title", () => {
      expect(() =>
        new Article.Builder()
          .userId(userId)
          .text(text)
          .tags(tags)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must have a text", () => {
      expect(() =>
        new Article.Builder()
          .userId(userId)
          .title(title)
          .tags(tags)
          .build()
      ).to.throw(PropertyRequiredException);
    });

    it("must have at least one tag", () => {
      expect(() =>
        new Article.Builder()
          .userId(userId)
          .title(title)
          .text(text)
          .tags([])
          .build()
      ).to.throw(AtLeastOneTagException);
    });

    it("if it has every required property should be ok", () => {
      const id = "c37d82c9-6b50-4707-99e7-180b661965c3"; // random uuid
      const article = new Article.Builder()
        .userId(userId)
        .title(title)
        .text(text)
        .tags(tags)
        .id(id)
        .build();

      expect(article.userId).to.be.eql(userId);
      expect(article.title).to.be.eql(title);
      expect(article.text).to.be.eql(text);
      expect(article.tags).to.be.eql(tags);
      expect(article.id).to.be.eql(id);
    });
  });
});
