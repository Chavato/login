import { UserService } from "../../services/user.service";
import { User } from "../../models/User";
import { anonymizeCPF } from "../../utils/cpf.utils";

jest.mock("../../models/User");
jest.mock("../../utils/cpf.utils");

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return users with anonymized CPF", async () => {
      const mockUsers = [
        { id: 1, name: "Rafael Chaves", email: "rafael@example.com", cpf: "12345678900" },
        { id: 2, name: "Lucas Silva", email: "lucas@example.com", cpf: "98765432100" },
      ];

      (User.findAll as jest.Mock).mockResolvedValue(mockUsers);
      (anonymizeCPF as jest.Mock).mockImplementation((cpf: string) => cpf.replace(/^(\d{3})/, "***"));

      const result = await UserService.getAllUsers();

      expect(User.findAll).toHaveBeenCalledWith({
        attributes: ["id", "name", "email", "cpf"],
      });

      expect(anonymizeCPF).toHaveBeenCalledTimes(mockUsers.length);

      expect(result).toEqual([
        {
          id: 1,
          name: "Rafael Chaves",
          email: "rafael@example.com",
          cpf: "***45678900",
        },
        {
          id: 2,
          name: "Lucas Silva",
          email: "lucas@example.com",
          cpf: "***65432100",
        },
      ]);
    });
  });
});
