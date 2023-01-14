import { Expose } from 'class-transformer';

export class PerformerRdo {
  @Expose()
  public statusWork: string;

  @Expose()
  public userId: string;

  @Expose()
  public taskId: number;

  @Expose()
  public createdAt: Date;

  @Expose()
  public ready: boolean;

  @Expose()
  public assignee: boolean;

  @Expose()
  public id: number
}
