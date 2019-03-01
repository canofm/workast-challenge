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

  getAll(tags) {
    return this.articleRepository.getAll(tags);
  }
}

export default ArticleService;
