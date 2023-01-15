import * as dayjs from 'dayjs';
import { CustomerReview } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';

export class PerformerUserRdo {
  @Expose()
  @Transform(({obj}) => obj._id.toString())
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

  @Expose({name: 'dateBirth'})
  @Transform(({value}) => dayjs(value).fromNow().replace(' ago', ''))
  public age: number;

  @Expose()
  public rating: number;

  @Expose()
  public reviews: CustomerReview[];

  @Expose()
  public specialization: string
}
