import { User } from "../../entities/User";
import { CreateUserUseCase } from "./CreateUserUseCase";

const user: User = {
  email: "example@example.com",
  name: "example",
  password: "1234",
  id: "poasdjpsoaasd",
};



describe("Create user", () => {
  it("should be return the user is already created", async () => {
    const createUser = new CreateUserUseCase(
      {
        findByEmail: async () => {
          return user;
        },
        save: async () => {},
      },
      { sendMail: async () => {} }
    );
    
    await expect(
      createUser.execute({
        email: "example@example.com",
        name: "example",
        password: "1234",
      })
    ).rejects.toThrow();
  });

  it("should be create a new user", async () => {
    const createUser = new CreateUserUseCase(
      {
        findByEmail: async () => {
          return null;
        },
        save: async () => {},
      },
      { sendMail: async () => {} }
    );
    
    await expect(
      createUser.execute({
        email: "newUser@example.com",
        name: "newUser",
        password: "4321",
      })
    ).resolves.not.toThrow();
  });
});
