import { Expose, Transform } from 'class-transformer';

export class EditUserRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public city: string;

  @Expose()
  public aboutMyself: string;

  @Expose()
  public specialization: string[];

  @Expose()
  public dateBirth: Date;
}
