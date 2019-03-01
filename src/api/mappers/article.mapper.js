import { Article } from "../../domain";
import Mapper from "./mapper";

class ArticleMapper extends Mapper {
  toModel(entity) {
    return new Article.Builder()
      .userId(entity.userId)
      .title(entity.title)
      .text(entity.text)
      .tags(entity.tags)
      .build();
  }

  toDomain(model) {
    return new Article.Builder()
      .id(model._id)
      .userId(model.userId)
      .title(model.title)
      .text(model.text)
      .tags(model.tags)
      .build();
  }
}

export default ArticleMapper;
