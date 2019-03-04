class ArticleService {
  constructor(ArticleRepository) {
    this.articleRepository = ArticleRepository;
  }

  create(article) {
    return this.articleRepository.create(article);
  }

  update(id, article) {
    return this.articleRepository.update(id, article);
  }

  remove(id) {
    return this.articleRepository.remove(id);
  }
  /**
   * @returns an object with paginated information containing a collection of articles filtered.
   * @description fetch all articles that contains at least one of the tags given, regardless of the author.
   * @default if the list of tags is empty, then it will fetch all articles.
   *
   * @param {*} tags: [string] or string. Example: ["tag0", "tag1"] or "tag0,tag1"
   * @param {*} paginationOptions: { offset: 0, limit: 50 }
   */
  getAll(tags, paginationOptions) {
    const tagsToFilter = tags && !Array.isArray(tags) ? tags.split(",") : tags;
    return this.articleRepository.getAll(tagsToFilter, paginationOptions);
  }
}

export default ArticleService;
