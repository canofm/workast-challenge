class UserRepository {
  constructor(mapper, schema) {
    this.mapper = mapper;
    this.schema = schema;
  }

  create(user) {
    const userModel = this.mapper.toModel(user);
    return this.schema.create(userModel).then(this.mapper.toDomain);
  }
}

export default UserRepository;
