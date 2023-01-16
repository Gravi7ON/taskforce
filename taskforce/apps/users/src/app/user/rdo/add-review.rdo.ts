import { ApiProperty } from '@nestjs/swagger';
import { CustomerReview, UserCity } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';

export class AddReviewRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Chip Hawk',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    enum: UserCity
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User info',
    example: `I am Groooooooot`,
  })
  @Expose()
  public aboutMyself: string;

  @ApiProperty({
    description: 'User specialization',
    example: ['Строитель'],
  })
  @Expose()
  public specialization: string[];

  @ApiProperty({
    description: 'Date of register',
    example: new Date('2000-03-16').toISOString()
  })
  @Expose()
  public dateBirth: Date;

  @ApiProperty({
    description: 'Performer rating',
    example: 3.8
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Reviews for performer',
    example: [{
      taskId: 78,
      text: 'jhsadfhasdlkfjhasdlfkjalskjdfa;lskjdfal;sdjfal;sdjf;klasjdf;laskdjf',
      grade: 5,
      customerId: '63b70e3f56e71b45d3d73049',
      createdAt: '2023-01-15T09:37:59.439Z'
  }]
  })
  @Expose()
  public reviews: CustomerReview[];
}
