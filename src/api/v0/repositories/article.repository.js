import { isEmpty } from "lodash";
import { EntityNotFoundException } from "../../../exceptions";

class ArticleRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(article) {
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
          //In any case findOneAndUpdate fails it returns null, then we cannot know which is the real reason
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
    const filter = isEmpty(tags) ? {} : { tags: { $in: tags } };
    return this.schema
      .find(filter)
      .exec()
      .map(this.mapper.toDomain);
  }
}

export default ArticleRepository;
