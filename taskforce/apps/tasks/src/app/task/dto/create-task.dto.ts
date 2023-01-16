import { IsEnum, IsOptional, IsPositive, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Category, TaskStatus } from '@taskforce/shared-types';
import { CustomValidationDeadline } from '../../custom-validation.dto/custom-validation-deadline.dto';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Name task',
    example: 'Cupidatat duis Lorem elit'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  title: string;

  @ApiProperty({
    description: 'Description task',
    example: 'Cillum duis nisi sunt est in mollit fugiat cillum consectetur proident dolore in.'
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  description: string;

  @ApiProperty({
    description: 'Cost task',
    example: 400,
    required: false
  })
  @IsOptional()
  @IsPositive()
  cost?: number;

  @ApiProperty({
    description: 'Deadline task',
    example: new Date().toISOString(),
    required: false
  })
  @IsOptional()
  @Validate(CustomValidationDeadline)
  deadline?: Date;

  @ApiProperty({
    description: 'Image task',
    example: 'image.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/[.jpeg|.jpg|.png]$/)
  image?: string;

  @ApiProperty({
    description: 'Address execute task',
    example: 'Cupidatat duis Lorem elit',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  address?: string;

  @ApiProperty({
    description: 'Tags task',
    example: '#jkashf#jhsdfjahf#kjhdf',
    required: false
  })
  @IsOptional()
  @IsString()
  tags?: string;

  @ApiProperty({
    description: 'Status task',
    enum: TaskStatus,
    default: 'new'
  })
  @IsOptional()
  @IsString()
  @IsEnum(TaskStatus)
  status?: string;

  @ApiProperty({
    description: 'Category task',
    example: ['Грузоперевозки']
  })
  category: Category[];
  userId: string;
}
