import { User } from "../../domain";

class UserMapper {
  toModel(entity) {
    return new User.Builder()
      .name(entity.name)
      .avatar(entity.avatar)
      .build();
  }

  toDomain(model) {
    return new User.Builder()
      .name(model.name)
      .avatar(model.avatar)
      .id(model._id)
      .build();
  }
}

export default UserMapper;
