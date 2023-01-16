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
import { ApiProperty } from '@nestjs/swagger';

export class EditProfileDto {
  @ApiProperty({
    description: 'User name',
    example: 'Chip Hawk',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name?: string;

  @ApiProperty({
    description: 'User city',
    example: 'Москва',
    enum: UserCity,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsEnum(UserCity)
  public city?: UserCity;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
    required: false
  })
  @IsOptional()
  @IsISO8601(
    {},
    {message: AuthUserMessageException.DateBirthNotValid as string}
  )
  @Validate(CustomValidationMature)
  public dateBirth?: Date;

  @ApiProperty({
    description: 'User specialization',
    example: ['Строитель'],
    required: false
  })
  @IsOptional()
  @IsString({each: true})
  public specialization?: string[];

  @ApiProperty({
    description: 'User info',
    example: `I am Groooooooot`,
    required: false
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  public aboutMyself?: string;
}
