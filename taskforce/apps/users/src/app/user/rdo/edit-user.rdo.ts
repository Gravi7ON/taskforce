import { ApiProperty } from '@nestjs/swagger';
import { UserCity } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';

export class EditUserRdo {
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
    description: 'Date of birth',
    example: new Date().toISOString()
  })
  @Expose()
  public dateBirth: Date;
}
