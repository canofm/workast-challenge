class UserRepository {
  constructor(userSchema, userMapper) {
    this.userSchema = userSchema;
    this.userMapper = userMapper;
  }

  create(user) {
    const userModel = this.userMapper.toModel(user);
    return this.userSchema.create(userModel).then(this.userMapper.toDomain);
  }
}

export default UserRepository;
