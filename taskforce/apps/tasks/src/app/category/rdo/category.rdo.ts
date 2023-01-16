import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'The uniq category ID',
    example: 4
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'The title category',
    example: 'Грузоперевозки'
  })
  @Expose()
  public title: string;
}
