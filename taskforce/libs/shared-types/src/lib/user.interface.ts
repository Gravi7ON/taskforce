import { UserRole } from "./user-role.enum";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  password: string;
  role: UserRole;
  avatar?: string;
  dateBirth: Date;
}
