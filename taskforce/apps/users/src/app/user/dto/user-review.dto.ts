import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserReviewDto {
  @ApiProperty({
    description: 'Review text',
    example: `I am Groooooooot`,
  })
  @IsString()
  @MinLength(50)
  @MaxLength(500)
  public text: string;

  @ApiProperty({
    description: 'Review grade',
    example: 4,
  })
  @IsIn([1, 2, 3, 4, 5])
  @IsInt()
  @IsNumber()
  public grade: number;

  @ApiProperty({
    description: 'Unique task id',
    example: 35,
  })
  @IsNumber()
  public taskId: number;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @IsOptional()
  @IsString()
  public customerId: string;
}
