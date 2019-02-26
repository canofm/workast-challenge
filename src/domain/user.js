import { isEmpty } from "lodash";
import { PropertyRequiredException } from "../exceptions";

class User {
  constructor(build) {
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
        if (isEmpty(this._avatar)) {
          // TODO: This only makes senses if avatar has a default. So maybe it should throw an exception, just put the default...
          throw new PropertyRequiredException("User", "avatar");
        }
        return new User(this);
      }
    }
    return Builder;
  }
}

export default User;
