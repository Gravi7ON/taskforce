import { UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class CreatedUserRdo {
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public role: UserRole;
}
