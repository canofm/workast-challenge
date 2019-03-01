import ArticleMapper from "../mappers/article.mapper";
import { ArticleSchema } from "../../schemas/article.schema";
import ArticleRepository from "../repositories/article.repository";
import ArticleService from "../services/article.service";
import ArticleController from "../controllers/article.controller";

const defaultSetup = {
  mapper: new ArticleMapper(),
  schema: ArticleSchema
};

class ArticleAPIFactory {
  static getRepository(overrides = {}) {
    const { mapper, schema } = Object.assign({}, defaultSetup, overrides);
    return new ArticleRepository(mapper, schema);
  }

  static getService(repo = null) {
    const repository = repo ? repo : this.getRepository();
    return new ArticleService(repository);
  }

  static getController(overrides = {}) {
    const repository = this.getRepository(overrides);
    const service = this.getService(repository);
    return new ArticleController(service);
  }
}

export default ArticleAPIFactory;
