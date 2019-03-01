import sinon from "sinon";
import { expect } from "chai";
import ArticleAPIFactory from "../../factories/article.api.factory";
import { AtLeastOneTagException } from "../../../exceptions";

describe("ArticleService", () => {
  describe("on getAll", () => {
    let articleRepository, articleService;
    const fakeRepository = { getAll: () => {} };
    beforeEach(() => {
      articleRepository = sinon.mock(fakeRepository);
      articleService = ArticleAPIFactory.getService(fakeRepository);
    });

    it("if tags is an array with more than one value, should pass them to the repository", () => {
      const tags = ["tag0", "tag1"];
      articleRepository.expects("getAll").withExactArgs(tags);
      articleService.getAll(tags);

      articleRepository.verify();
    });

    it("if tags isn't an array, should convert them to an array and then pass them to the repository", () => {
      articleRepository.expects("getAll").withExactArgs(["tag0", "tag1"]);
      articleService.getAll("tag0,tag1");

      articleRepository.verify();
    });

    it("if tags is null or empty should raise at least one tag exception", () => {
      const getAllWithNullTags = () => articleService.getAll();
      const getAllWithEmptyStringTags = () => articleService.getAll("");

      expect(getAllWithNullTags).to.throw(AtLeastOneTagException);
      expect(getAllWithEmptyStringTags).to.throw(AtLeastOneTagException);
    });
  });
});
