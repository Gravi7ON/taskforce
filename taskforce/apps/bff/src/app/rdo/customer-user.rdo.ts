import { ApiProperty } from '@nestjs/swagger';
import { UserCity, UserRole } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class CustomerUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
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
    description: 'Amount new tasks',
    example: 5,
  })
  @Expose()
  public tasks: number;

  @ApiProperty({
    description: 'Amount all tasks',
    example: 50,
  })
  @Expose()
  public newTasks: number;
}
