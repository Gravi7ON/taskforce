import { Expose, Transform } from 'class-transformer';

export class CustomerUserRdo {
  @Expose()
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @Expose()
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public city: string;

  @Expose()
  public role: string;

  @Expose()
  public dateRegister: string;

  @Expose()
  public aboutMyself: string;

  @Expose()
  public tasks: number;

  @Expose()
  public newTasks: number;
}
