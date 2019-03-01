import { EntityNotFoundException } from "../../exceptions";

class ArticleRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(article) {
    //TODO: just in order to be consistent with other firms this should use async/await style
    const articleModel = this.mapper.toModel(article);
    return this.schema.create(articleModel).then(this.mapper.toDomain);
  }

  update(id, article) {
    return this.schema
      .findOneAndUpdate({ _id: id }, article, {
        new: true
      })
      .then(updatedArticle => {
        if (!updatedArticle) {
          //FIXME: In any case the findOneAndUpdate fails (required property missing, user id not found, or article didn't exists it returns null so we cannot know which was the cause of failing)
          throw new EntityNotFoundException("Article", id);
        }
        return this.mapper.toDomain(updatedArticle);
      });
  }

  remove(id) {
    return this.schema.deleteOne({ _id: id }).then(result => {
      if (result.deletedCount === 0) {
        throw new EntityNotFoundException("Article", id);
      }
      return result;
    });
  }

  //TODO: pagination
  getAll(tags) {
    return this.schema
      .find({ tags: { $in: tags } })
      .exec()
      .map(this.mapper.toDomain);
  }
}

export default ArticleRepository;
