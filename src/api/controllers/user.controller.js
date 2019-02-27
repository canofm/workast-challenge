export default class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  create(req, res, next) {
    return this.userService
      .create(req.body)
      .then(user => res.status(201).json(user))
      .catch(err => next(err));
  }
}
