import { expect } from "chai";
import User from "../user";
import { PropertyRequiredException } from "../../exceptions";

describe("User", () => {
  describe("while building", () => {
    const name = "aName";
    const avatar = "1234";

    it("must have a name", () => {
      expect(() => new User.Builder().avatar(avatar).build()).to.throw(PropertyRequiredException);
    });

    it("must have an avatar", () => {
      expect(() => new User.Builder().name(name).build()).to.throw(PropertyRequiredException);
    });

    it("should be ok if it has both: name and avatar", () => {
      const id = "asd123asd2"; //TODO: uuid
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
