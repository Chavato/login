import { User } from '../models/User';
import { anonymizeCPF } from '../utils/cpf.utils';
import { UserResponseDTO } from '../dtos/UserResponseDTO';
import { HttpError } from '../errors/HttpError';

export class UserService {
  static async getAllUsers(): Promise<UserResponseDTO[]> {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'cpf', 'role'],
    });

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: anonymizeCPF(user.cpf),
      role: user.role,
    }));
  }

  static async getUserById(id: number): Promise<UserResponseDTO> {
    const user = await User.findOne({ where: { id } });

    if (!user) throw new HttpError('User not found.', 404);

    const userDto: UserResponseDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: anonymizeCPF(user.cpf),
      role: user.role,
    };

    return userDto;
  }
}
