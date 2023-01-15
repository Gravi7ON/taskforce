import { IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserReviewDto {
  @IsString()
  @MinLength(50)
  @MaxLength(500)
  public text: string;

  @IsIn([1, 2, 3, 4, 5])
  @IsInt()
  @IsNumber()
  public grade: number;

  @IsNumber()
  public taskId: number;

  @IsOptional()
  @IsString()
  public customerId: string;
}
