import { IsEnum, IsOptional, IsPositive, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { Category, TaskStatus } from '@taskforce/shared-types';
import { CustomValidationDeadline } from '../../custom-validation.dto/custom-validation-deadline.dto';

export class CreateTaskDto {
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  title: string;

  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  description: string;

  @IsOptional()
  @IsPositive()
  cost?: number;

  @IsOptional()
  @Validate(CustomValidationDeadline)
  deadline?: Date;

  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  image?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  tags?: string;

  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status?: string;

  category: Category[];
  userId: string;
}
