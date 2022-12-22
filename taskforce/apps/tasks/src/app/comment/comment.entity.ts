import { Comment } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  public id: number;
  public text: string;
  public userId: string;
  public createdAt: Date;
  public taskId: number;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.text = entity.text;
    this.id = entity.id;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.taskId = Number(entity.taskId);
  }

  public toObject(): CommentEntity {
    return { ...this }
  }
}
