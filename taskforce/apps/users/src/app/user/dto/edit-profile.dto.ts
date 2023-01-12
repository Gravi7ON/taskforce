import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';
import { AUTH_USER_DATE_BIRTH_NOT_VALID } from '../../auth/auth.constant';
import { CustomValidationMature } from '../../custom-validation-dto/custom-validate-mature.dto';
import { UserCity } from '@taskforce/shared-types';

export class EditProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserCity)
  public city?: UserCity;

  @IsOptional()
  @IsISO8601(
    {},
    {message: AUTH_USER_DATE_BIRTH_NOT_VALID}
  )
  @Validate(CustomValidationMature)
  public dateBirth?: Date;

  @IsOptional()
  @IsString({each: true})
  public specialization?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(300)
  public aboutMyself?: string;
}
