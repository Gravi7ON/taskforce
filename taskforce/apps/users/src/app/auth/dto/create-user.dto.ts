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

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name: string;

  @IsEmail(
    {},
    {message: AuthUserMessageException.EmailNotValid as string}
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
    {message: AuthUserMessageException.DateBirthNotValid as string}
  )
  @Validate(CustomValidationMature)
  public dateBirth: Date;

  @IsOptional()
  public specialization?: string[];

  @IsOptional()
  public aboutMyself?: string;

  @IsOptional()
  @IsBoolean()
  public sendNotify?: boolean;
}
