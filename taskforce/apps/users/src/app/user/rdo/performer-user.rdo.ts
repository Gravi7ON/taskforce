import { Expose } from 'class-transformer';

export class PerformerUserRdo {
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
  public successedTasks: number;

  @Expose()
  public failedTasks: number;

  @Expose()
  public age: number;

  @Expose()
  public rating: number;

  @Expose()
  public ranking: number;

  @Expose()
  public specialization: string
}
