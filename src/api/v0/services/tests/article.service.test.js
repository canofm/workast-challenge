import sinon from "sinon";
import ArticleAPIFactory from "../../factories/article.api.factory";

describe("ArticleService", () => {
  describe("on getAll", () => {
    let articleRepository, articleService;
    const defaultPagination = { offset: null, limit: null };
    const fakeRepository = { getAll: () => {} };
    beforeEach(() => {
      articleRepository = sinon.mock(fakeRepository);
      articleService = ArticleAPIFactory.getService(fakeRepository);
    });

    it("if tags is an array with more than one value, should pass them to the repository", () => {
      const tags = ["tag0", "tag1"];
      articleRepository.expects("getAll").withExactArgs(tags, defaultPagination);
      articleService.getAll(tags, defaultPagination);

      articleRepository.verify();
    });

    it("if tags is a string, should convert it into an array and then pass them to the repository", () => {
      articleRepository.expects("getAll").withExactArgs(["tag0", "tag1"], defaultPagination);
      articleService.getAll("tag0,tag1", defaultPagination);

      articleRepository.verify();
    });

    it("if tags is null, should pass it to the repository", () => {
      articleRepository.expects("getAll").withExactArgs(undefined, defaultPagination);
      articleService.getAll(undefined, defaultPagination);

      articleRepository.verify();
    });
  });
});
