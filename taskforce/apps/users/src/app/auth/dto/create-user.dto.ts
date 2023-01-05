import {
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
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID
} from '../auth.constant';
import { CustomValidationMature } from './custom-validate-mature';

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name: string;

  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID}
  )
  public email: string;

  @IsString()
  @IsEnum(UserCity)
  public city: UserCity;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public passwordHash: string;

  @IsString()
  @IsEnum(UserRole)
  public role: UserRole;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  public avatar?: string;

  @IsISO8601(
    {},
    {message: AUTH_USER_DATE_BIRTH_NOT_VALID}
  )
  @Validate(CustomValidationMature)
  public dateBirth: Date;

  public specialization?: string[];
  public aboutMyself?: string;
}
