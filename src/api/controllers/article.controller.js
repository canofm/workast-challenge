export default class ArticleController {
  constructor(articleService) {
    this.articleService = articleService;
  }

  create(req, res, next) {
    return this.articleService
      .create(req.body)
      .then(article => res.status(201).json(article))
      .catch(err => next(err));
  }

  update(req, res, next) {
    return this.articleService
      .update(req.params.id, req.body)
      .then(articleUpdated => res.status(200).json(articleUpdated))
      .catch(err => next(err));
  }

  remove(req, res, next) {
    return this.articleService
      .remove(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(err => next(err));
  }

  getAll(req, res, next) {
    return this.articleService
      .getAll(req.query.tags)
      .then(results => res.status(200).json(results))
      .catch(err => next(err));
  }
}
