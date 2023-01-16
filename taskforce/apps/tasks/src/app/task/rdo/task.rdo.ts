import { Expose, Transform } from 'class-transformer';
import { Comment, Performer, Category, TaskStatus } from '@taskforce/shared-types';
import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from '../../comment/rdo/comment.rdo';
import { PerformerRdo } from '../../performer/rdo/performer.rdo';

export class TaskRdo {
  @ApiProperty({
    description: 'The unique task ID',
    example: 33
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Name task',
    example: 'Cupidatat duis Lorem elit'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Description task',
    example: 'Cillum duis nisi sunt est in mollit fugiat cillum consectetur proident dolore in.'
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Category task',
    example: ['Грузоперевозки']
  })
  @Expose()
  @Transform(({value}) => value.map(category => category.title))
  public category: Category[];

  @ApiProperty({
    description: 'Cost task',
    example: 400
  })
  @Expose()
  public cost: number;

  @ApiProperty({
    description: 'Deadline task',
    example: new Date().toISOString()
  })
  @Expose()
  public deadline: Date;

  @ApiProperty({
    description: 'Image task',
    example: 'image.jpg'
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Address execute task',
    example: 'Cupidatat duis Lorem elit'
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Tags task',
    example: '#jkashf#jhsdfjahf#kjhdf'
  })
  @Expose()
  public tags: string;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date of create',
    example: new Date('2000-03-16').toISOString()
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'List of comments',
    type: [CommentRdo]
  })
  @Expose()
  public comments: Comment[];

  @ApiProperty({
    description: 'List of responded performers',
    type: [PerformerRdo]
  })
  @Expose()
  public performers: Performer[];

  @ApiProperty({
    description: 'Status task',
    enum: TaskStatus,
    default: 'new'
  })
  @Expose()
  public status: string;
}
