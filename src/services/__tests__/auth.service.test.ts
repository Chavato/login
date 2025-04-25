import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';
import * as jwtUtils from '../../utils/jwt.utils';
import * as cpfUtils from '../../utils/cpf.utils';
import { RegisterDTO } from '../../dtos/RegisterDTO';
import { HttpError } from '../../errors/HttpError';

jest.mock('../../models/User');
jest.mock('bcrypt');
jest.mock('../../utils/jwt.utils');
jest.mock('../../utils/cpf.utils');

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should create a user and return public data', async () => {
      const mockData: RegisterDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        cpf: '12345678901',
      };

      (User.findOne as jest.Mock).mockResolvedValue(null);
      (cpfUtils.isValidCPFFormat as jest.Mock).mockReturnValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed_password');
      (User.create as jest.Mock).mockResolvedValue({
        id: 1,
        name: mockData.name,
        email: mockData.email,
      });

      const result = await AuthService.register(mockData);

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: mockData.email },
      });
      expect(cpfUtils.isValidCPFFormat).toHaveBeenCalledWith(mockData.cpf);
      expect(result).toEqual({
        id: 1,
        name: mockData.name,
        email: mockData.email,
      });
    });

    it('should throw HttpError if email is already registered', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({ id: 1 });

      await expect(
        AuthService.register({
          name: 'Test',
          email: 'test@example.com',
          password: 'pass',
          cpf: '12345678901',
        })
      ).rejects.toThrow(HttpError);

      await expect(
        AuthService.register({
          name: 'Test',
          email: 'test@example.com',
          password: 'pass',
          cpf: '12345678901',
        })
      ).rejects.toMatchObject({
        message: 'Email already registered.',
        statusCode: 400,
      });
    });

    it('should throw HttpError if CPF format is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (cpfUtils.isValidCPFFormat as jest.Mock).mockReturnValue(false);

      await expect(
        AuthService.register({
          name: 'Test',
          email: 'test@example.com',
          password: 'pass',
          cpf: 'invalid-cpf',
        })
      ).rejects.toThrow(HttpError);

      await expect(
        AuthService.register({
          name: 'Test',
          email: 'test@example.com',
          password: 'pass',
          cpf: 'invalid-cpf',
        })
      ).rejects.toMatchObject({
        message: 'CPF is invalid.',
        statusCode: 400,
      });
    });
  });

  describe('login', () => {
    it('should login a user and return a token', async () => {
      const loginData = { email: 'john@example.com', password: '123456' };

      const userMock = {
        id: 1,
        email: loginData.email,
        password: 'hashed_password',
      };

      (User.findOne as jest.Mock).mockResolvedValue(userMock);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      jest.spyOn(jwtUtils, 'generateToken').mockReturnValue('fake_token');

      const result = await AuthService.login(loginData);

      expect(result).toEqual({ token: 'fake_token' });
    });

    it('should throw HttpError if user not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(
        AuthService.login({ email: 'x@x.com', password: '123' })
      ).rejects.toThrow(HttpError);

      await expect(
        AuthService.login({ email: 'x@x.com', password: '123' })
      ).rejects.toMatchObject({
        message: 'User or password are invalid.',
        statusCode: 400,
      });
    });

    it('should throw if password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        email: 'x@x.com',
        password: 'hashed',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        AuthService.login({ email: 'x@x.com', password: 'wrong' })
      ).rejects.toThrow(HttpError);

      await expect(
        AuthService.login({ email: 'x@x.com', password: '123' })
      ).rejects.toMatchObject({
        message: 'User or password are invalid.',
        statusCode: 400,
      });
    });
  });
});
