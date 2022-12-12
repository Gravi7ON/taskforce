import { UserCity, UserRole } from '@taskforce/shared-types';

export class CreateUserDto {
  public name: string;
  public email: string;
  public city: UserCity;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public dateBirth: Date;
}
