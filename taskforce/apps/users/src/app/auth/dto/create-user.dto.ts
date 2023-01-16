import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';
import { UserCity, UserRole } from '@taskforce/shared-types';
import {
  AuthUserMessageException
} from '../auth.constant';
import { CustomValidationMature } from '../../custom-validation-dto/custom-validate-mature.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Chip Hawk',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name: string;


  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail(
    {},
    {message: AuthUserMessageException.EmailNotValid as string}
  )
  public email: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    enum: UserCity
  })
  @IsString()
  @IsEnum(UserCity)
  public city: UserCity;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public passwordHash: string;

  @ApiProperty({
    description: 'User role',
    example: 'Исполнитель',
    enum: UserRole
  })
  @IsString()
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar',
    example: 'avatar.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  public avatar?: string;


  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  @IsISO8601(
    {},
    {message: AuthUserMessageException.DateBirthNotValid as string}
  )
  @Validate(CustomValidationMature)
  public dateBirth: Date;

  @ApiProperty({
    description: 'User specialization',
    example: ['Строитель'],
    required: false
  })
  @IsOptional()
  public specialization?: string[];

  @ApiProperty({
    description: 'User info',
    example: `I am Groooooooot`,
    required: false
  })
  @IsOptional()
  public aboutMyself?: string;

  @ApiProperty({
    description: 'Send notify performers about new tasks',
    example: true,
    default: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  public sendNotify?: boolean;
}
