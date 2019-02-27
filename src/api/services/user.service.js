class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  create(user) {
    this.userRepository.create(user);
  }
}

export default UserService;
