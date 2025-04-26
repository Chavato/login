import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt.utils';
import { isValidCPFFormat } from '../utils/cpf.utils';
import { User } from '../models/User';
import { RegisterDTO } from '../dtos/RegisterDTO';
import { LoginDTO } from '../dtos/LoginDTO';
import { RegisterResponseDTO } from '../dtos/RegisterResponseDTO';
import { LoginResponseDTO } from '../dtos/LoginResponseDTO';
import { HttpError } from '../errors/HttpError';
import { Role } from '../enums/Role';

export class AuthService {
  static async register(data: RegisterDTO): Promise<RegisterResponseDTO> {
    const { name, email, password, cpf } = data;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      throw new HttpError('Email already registered.', 400);
    }

    if (!isValidCPFFormat(cpf)) {
      throw new HttpError('CPF is invalid.', 400);
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hash,
      cpf,
      role: Role.User,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
  }

  static async login(data: LoginDTO): Promise<LoginResponseDTO> {
    const { email, password } = data;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new HttpError('User or password are invalid.', 400);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new HttpError('User or password are invalid.', 400);
    }

    const token: string = generateToken({ id: user.id, email: user.email });

    return { token };
  }
}
