import { Performer, Comment, Task, Category } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public id?: number;
  public title: string;
  public description: string;
  public category: Category[];
  public cost?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public tags?: string;
  public status: string;
  public createdAt: Date;
  public updatedAt: Date;
  public userId: string;
  public comments?: Comment[];
  public performers?: Performer[];

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task) {
    this.title = entity.title;
    this.id = entity.id;
    this.description = entity.description;
    this.category = [...entity.category];
    this.cost = entity.cost;
    this.deadline = entity.deadline;
    this.image = entity.image;
    this.address = entity.address;
    this.tags = entity.tags;
    this.status = entity.status;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.createdAt;
    this.userId = entity.userId;
    this.comments = [];
    this.performers = [];
  }

  public toObject(): TaskEntity {
    return {
      ...this,
      category: this.category.map(elem => ({id: typeof elem === 'number' ? elem : elem.id})),
    };
  }
}
