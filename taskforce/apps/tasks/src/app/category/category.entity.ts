import { Category } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';

export class CategoryEntity implements Entity<CategoryEntity>, Category {
  public id: number;
  public title: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Category) {
    this.title = entity.title;
    this.id = entity.id;
  }

  public toObject(): CategoryEntity {
    return { ...this }
  }
}
