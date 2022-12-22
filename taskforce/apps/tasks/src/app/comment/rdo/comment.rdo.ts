import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose()
  public text: string;

  @Expose()
  public userId: string;

  @Expose()
  public taskId: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public id: number
}
