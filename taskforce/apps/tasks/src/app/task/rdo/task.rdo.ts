import { Expose, Transform } from 'class-transformer';
import { Comment, Performer, Category } from '@taskforce/shared-types';

export class TaskRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  @Transform(({value}) => value.map(category => category.title))
  public category: Category[];

  @Expose()
  public cost?: number;

  @Expose()
  public deadline: Date;

  @Expose()
  public image: string;

  @Expose()
  public address: string;

  @Expose()
  public tags: string;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: string;

  @Expose()
  public updatedAt: string;

  @Expose()
  public comments: Comment[];

  @Expose()
  public performers: Performer[];

  @Expose()
  public status: string;
}
