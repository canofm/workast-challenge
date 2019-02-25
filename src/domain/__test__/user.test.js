import User from "../user";
import { PropertyRequiredException } from "../../exceptions";

describe("User", () => {
  describe("while building", () => {
    const name = "aName";
    const avatar = "1234";

    it("must have a name", () => {
      expect(() => new User.Builder().avatar(avatar).build()).toThrow(PropertyRequiredException);
    });

    it("must have an avatar", () => {
      expect(() => new User.Builder().name(name).build()).toThrow(PropertyRequiredException);
    });

    it("should be ok if it has both: name and avatar", () => {
      const id = "asd123asd2"; //TODO: uuid
      const user = new User.Builder()
        .name(name)
        .avatar(avatar)
        .id(id)
        .build();

      expect(user.name).toBe(name);
      expect(user.avatar).toBe(avatar);
      expect(user.id).toBe(id);
    });
  });
});
