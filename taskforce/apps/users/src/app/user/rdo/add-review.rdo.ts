import { CustomerReview } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';

export class AddReviewRdo {
  @Expose()
  @Transform(({obj}) => obj._id.toString())
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

  @Expose()
  public rating: number;

  @Expose()
  public reviews: CustomerReview[];
}
