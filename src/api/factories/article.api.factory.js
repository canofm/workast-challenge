import ArticleMapper from "../mappers/article.mapper";
import { ArticleSchema } from "../../schemas/article.schema";
import ArticleRepository from "../repositories/article.repository";

const defaultSetup = {
  mapper: new ArticleMapper(),
  schema: ArticleSchema
};

class ArticleAPIFactory {
  static getRepository(overrides = {}) {
    const { mapper, schema } = Object.assign({}, defaultSetup, overrides);
    return new ArticleRepository(mapper, schema);
  }
}

export default ArticleAPIFactory;
