import { Expose } from 'class-transformer';
import { Comment, Performer } from '@taskforce/shared-types';

export class CreateTaskDto {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public category: string;

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
}
