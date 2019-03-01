import { AtLeastOneTagException } from "../../exceptions";

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
    if (!tags || tags.length < 0) {
      throw new AtLeastOneTagException();
    }
    const tagsToFilter = !Array.isArray(tags) ? tags.split(",") : tags;
    return this.articleRepository.getAll(tagsToFilter);
  }
}

export default ArticleService;
