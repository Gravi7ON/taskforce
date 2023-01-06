import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  public text: string;

  @IsOptional()
  @IsString()
  public userId: string;

  @IsOptional()
  @IsNumber()
  public taskId: number;
}
