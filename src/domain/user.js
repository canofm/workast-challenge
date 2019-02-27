import { isEmpty } from "lodash";
import { PropertyRequiredException, BuilderException } from "../exceptions";

class User {
  constructor(build) {
    if (!build) {
      throw new BuilderException("User");
    }

    this.name = build._name;
    this.avatar = build._avatar;
    if (!isEmpty(build._id)) this.id = build._id;
  }

  static get Builder() {
    class Builder {
      name(name) {
        this._name = name;
        return this;
      }

      avatar(avatar) {
        this._avatar = avatar;
        return this;
      }

      id(id) {
        this._id = id;
        return this;
      }

      build() {
        if (isEmpty(this._name)) {
          throw new PropertyRequiredException("User", "name");
        }
        return new User(this);
      }
    }
    return Builder;
  }
}

export default User;
