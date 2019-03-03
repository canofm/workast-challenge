class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  create(user) {
    return this.userRepository.create(user);
  }
}

export default UserService;
