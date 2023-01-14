import { Performer } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class PerformerEntity implements Entity<PerformerEntity>, Performer {
  public id?: number;
  public userId: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public taskId: number;
  public assignee?: boolean;
  public ready?: boolean;
  public statusWork?: string;

  constructor(respond: Performer) {
    this.fillEntity(respond);
  }

  public fillEntity(entity: Performer) {
    this.id = entity.id;
    this.userId = entity.userId;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
    this.assignee = entity.assignee;
    this.taskId = entity.taskId;
    this.ready = entity.ready;
    this.statusWork = entity.statusWork;
  }

  public toObject(): PerformerEntity {
    return { ...this }
  }
}
