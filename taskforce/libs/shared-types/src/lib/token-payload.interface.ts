import { UserRole } from './user-role.enum';

export interface TokenPayload {
  email: string;
  name: string,
  role: UserRole,
  id: string
}
