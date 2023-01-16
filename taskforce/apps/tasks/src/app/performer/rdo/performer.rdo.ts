import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PerformerRdo {
  @ApiProperty({
    description: 'Completed or failed task',
    default: ''
  })
  @Expose()
  public statusWork: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'The uniq task ID',
    example: 22
  })
  @Expose()
  public taskId: number;

  @ApiProperty({
    description: 'Date of create task',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Prepareness performer to execute task',
    example: true
  })
  @Expose()
  public ready: boolean;

  @ApiProperty({
    description: 'Is customer choosen performer to execute task',
    default: false
  })
  @Expose()
  public assignee: boolean;

  @ApiProperty({
    description: 'The uniq respond ID',
    example: 22
  })
  @Expose()
  public id: number
}
