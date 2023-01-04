import { UserCity } from '@taskforce/shared-types';

export class EditProfileDto {
  public name?: string;
  public city?: UserCity;
  public dateBirth?: Date;
  public specialization?: string[];
  public aboutMyself?: string;
}
