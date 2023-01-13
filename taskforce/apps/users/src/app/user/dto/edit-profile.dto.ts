import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator';
import { AuthUserMessageException } from '../../auth/auth.constant';
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
    {message: AuthUserMessageException.DateBirthNotValid as string}
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
