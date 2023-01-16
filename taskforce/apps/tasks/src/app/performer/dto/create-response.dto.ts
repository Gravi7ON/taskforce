import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRespondDto {
  @ApiProperty({
    description: 'The uniq task ID',
    example: 5
  })
  @IsNumber()
  public taskId: number;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @IsString()
  @IsOptional()
  public userId: string;

  @ApiProperty({
    description: 'Prepareness performer to execute task',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  public ready: boolean;
}
