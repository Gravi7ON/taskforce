import { Expose } from 'class-transformer';

export class CustomerUserRdo {
  @Expose({ name: '_id'})
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
  public about: string;

  @Expose()
  public tasks: number;

  @Expose()
  public newTasks: number;
}
