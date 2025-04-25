import { UserService } from '../../services/user.service';
import { User } from '../../models/User';
import { anonymizeCPF } from '../../utils/cpf.utils';
import { HttpError } from '../../errors/HttpError';

jest.mock('../../models/User');
jest.mock('../../utils/cpf.utils');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // <-- limpa tudo antes de cada teste
  });

  describe('getAllUsers', () => {
    it('should return users with anonymized CPF', async () => {
      const mockUsers = [
        {
          id: 1,
          name: 'Rafael Chaves',
          email: 'rafael@example.com',
          cpf: '12345678900',
        },
        {
          id: 2,
          name: 'Lucas Silva',
          email: 'lucas@example.com',
          cpf: '98765432100',
        },
      ];

      (User.findAll as jest.Mock).mockResolvedValue(mockUsers);
      (anonymizeCPF as jest.Mock).mockImplementation((cpf: string) =>
        cpf.replace(/^(\d{3})/, '***')
      );

      const result = await UserService.getAllUsers();

      expect(User.findAll).toHaveBeenCalledWith({
        attributes: ['id', 'name', 'email', 'cpf'],
      });

      expect(anonymizeCPF).toHaveBeenCalledTimes(mockUsers.length);

      expect(result).toEqual([
        {
          id: 1,
          name: 'Rafael Chaves',
          email: 'rafael@example.com',
          cpf: '***45678900',
        },
        {
          id: 2,
          name: 'Lucas Silva',
          email: 'lucas@example.com',
          cpf: '***65432100',
        },
      ]);
    });
  });

  describe('getUserById', () => {
    it('should return user with anonymized CPF', async () => {
      const mockUser = {
        id: 1,
        name: 'Rafael Chaves',
        email: 'rafael@example.com',
        cpf: '12345678900',
      };

      const id = 1;

      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (anonymizeCPF as jest.Mock).mockImplementation((cpf: string) =>
        cpf.replace(/^(\d{3})/, '***')
      );

      const result = await UserService.getUserById(id);

      expect(User.findOne).toHaveBeenCalledWith({ where: { id } });
      expect(User.findOne).toHaveBeenCalledTimes(1);
      expect(anonymizeCPF).toHaveBeenCalledWith('12345678900');
      expect(result).toEqual({
        id: 1,
        name: 'Rafael Chaves',
        email: 'rafael@example.com',
        cpf: '***45678900',
      });
    });

    it('should throw a HttpError with status code 404', async () => {
      const id = 1;

      (User.findOne as jest.Mock).mockResolvedValue(null);

      const result = UserService.getUserById(id);

      await expect(result).rejects.toThrow(HttpError);
      await expect(result).rejects.toMatchObject({
        message: 'User not found.',
        statusCode: 404,
      });
    });
  });
});
