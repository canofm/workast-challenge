class UserRepository {
  constructor(userMapper, userSchema) {
    this.userMapper = userMapper;
    this.userSchema = userSchema;
  }

  create(user) {
    const userModel = this.userMapper.toModel(user);
    return this.userSchema.create(userModel).then(this.userMapper.toDomain);
  }
}

export default UserRepository;
