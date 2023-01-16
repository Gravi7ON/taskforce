import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Text comment',
    example: 'Ut quis fugiat officia consectetur aliquip anim aliquip.'
  })
  @IsString()
  @MinLength(10)
  @MaxLength(300)
  public text: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @IsOptional()
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 46
  })
  @IsOptional()
  @IsNumber()
  public taskId: number;
}
