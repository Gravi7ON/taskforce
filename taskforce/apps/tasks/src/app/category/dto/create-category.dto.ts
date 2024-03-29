import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Name of catogory',
    example: 'Клининг'
  })
  @IsString()
  public title: string;
}
