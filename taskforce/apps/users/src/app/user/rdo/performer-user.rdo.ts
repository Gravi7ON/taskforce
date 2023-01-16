import * as dayjs from 'dayjs';
import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@taskforce/shared-types';

export class PerformerUserRdo {
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
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    enum: UserCity
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель',
    enum: UserRole
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Date of register',
    example: new Date().toISOString()
  })
  @Expose({name: 'createdAt'})
  public registerDate: string;

  @ApiProperty({
    description: 'User info',
    example: `I am Groooooooot`,
  })
  @Expose()
  public aboutMyself: string;

  @ApiProperty({
    description: 'Successed tasks',
    example: 5,
  })
  @Expose()
  public successedTasks: number;

  @ApiProperty({
    description: 'Failed tasks',
    example: 5,
  })
  @Expose()
  public failedTasks: number;

  @ApiProperty({
    description: 'User age',
    example: 29,
  })
  @Expose({name: 'dateBirth'})
  @Transform(({value}) => dayjs(value).fromNow().replace(' ago', ''))
  public age: number;

  @ApiProperty({
    description: 'Rating of user',
    example: 5,
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'User specialization',
    example: ['Строитель'],
  })
  @Expose()
  public specialization: string
}
