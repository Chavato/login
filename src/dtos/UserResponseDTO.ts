import { Role } from '../enums/Role';

export interface UserResponseDTO {
  id: number;
  name: string;
  email: string;
  cpf: string;
  role: Role;
}
