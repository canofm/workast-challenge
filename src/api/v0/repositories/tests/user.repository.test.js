import { expect } from "chai";
import { cleanDb } from "../../../../test_helpers";
import { User } from "../../../../domain";
import UserAPIFactory from "../../factories/user.api.factory";
import { PropertyRequiredException } from "../../../../exceptions";

describe("UserRepository", () => {
  const userRepository = UserAPIFactory.getRepository();

  describe("on create", () => {
    beforeEach(async () => await cleanDb());
    afterEach(async () => await cleanDb());

    it("should return the user just created", async () => {
      const name = "aName";
      const avatar = "anAvatar";
      const user = new User.Builder()
        .name(name)
        .avatar(avatar)
        .build();

      const userCreated = await userRepository.create(user);

      expect(userCreated.name).to.be.eql(name);
      expect(userCreated.avatar).to.be.eql(avatar);
      expect(userCreated.id).to.exist;
    });

    it("should throws a PropertyRequiredException if the object given miss a required property", () => {
      const create = () => userRepository.create({ avatar: "anAvatar" });

      expect(create).to.throw(PropertyRequiredException);
    });
  });
});
