import { Expose, Transform } from 'class-transformer';

export class PerformerUserRdo {
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

  @Expose({name: 'createdAt'})
  public registerDate: string;

  @Expose()
  public aboutMyself: string;

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
