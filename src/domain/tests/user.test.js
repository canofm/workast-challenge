import { expect } from "chai";
import User from "../user";
import { PropertyRequiredException, BuilderException } from "../../exceptions";

describe("User", () => {
  describe("while building", () => {
    const name = "aName";
    const avatar = "anAvatar";

    it("must have a name", () => {
      expect(() => new User.Builder().avatar(avatar).build()).to.throw(PropertyRequiredException);
    });

    it("must be created through builder", () => {
      expect(() => new User()).to.throw(BuilderException);
    });

    it("if it has every required property should be ok", () => {
      const id = "c37d82c9-6b50-4707-99e7-180b661965c3"; // random uuid
      const user = new User.Builder()
        .name(name)
        .avatar(avatar)
        .id(id)
        .build();

      expect(user.name).to.be.eql(name);
      expect(user.avatar).to.be.eql(avatar);
      expect(user.id).to.be.eql(id);
    });
  });
});
