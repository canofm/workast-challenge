import UserMapper from "../mappers/user.mapper";
import { UserSchema } from "../../../schemas/user.schema";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

const defaultSetup = {
  mapper: new UserMapper(),
  schema: UserSchema
};

class UserAPIFactory {
  static getController(overrides = {}) {
    const repository = this.getRepository(overrides);
    const service = this.getService(repository);
    return new UserController(service);
  }

  static getRepository(overrides = {}) {
    const { mapper, schema } = Object.assign({}, defaultSetup, overrides);
    return new UserRepository(mapper, schema);
  }

  static getService(repo = null) {
    const repository = repo ? repo : this.getRepository();
    return new UserService(repository);
  }
}

export default UserAPIFactory;
