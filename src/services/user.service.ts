import { User } from "../models/User";
import { anonymizeCPF } from "../utils/cpf.utils";
import { UserResponseDTO } from "../dtos/UserResponseDTO";

export class UserService {
  static async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "cpf"],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: anonymizeCPF(user.cpf),
    }));
  }
}