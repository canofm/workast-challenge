import UserMapper from "../mappers/user.mapper";
import { UserSchema } from "../../schemas/user.schema";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";
import UserController from "../controllers/user.controller";

class UserAPIFactory {
  static get(overrides = {}) {
    const defaultSetup = {
      mapper: new UserMapper(),
      schema: new UserSchema()
    };
    const { mapper, schema } = Object.assign({}, defaultSetup, overrides);
    const repository = new UserRepository(mapper, schema);
    const service = new UserService(repository);
    return new UserController(service);
  }
}

export default UserAPIFactory;
