import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Text comment',
    example: 'Culpa est proident eu mollit et dolor.'
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 34
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Date of created comment',
    example: new Date().toISOString()
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'The uniq commetn ID',
    example: 56
  })
  @Expose()
  public id: number
}
