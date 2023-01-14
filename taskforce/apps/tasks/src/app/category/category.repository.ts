import { CRUDRepository } from '@taskforce/core';
import { CategoryEntity } from './category.entity';
import { Category } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository implements CRUDRepository<CategoryEntity, number, Category> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CategoryEntity): Promise<Category> {
    return this.prisma.category.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: {
       id,
      }
    });
  }

  public findById(id: number): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        id
      }
    });
  }

  public findByTitle(title: string): Promise<Category | null> {
    return this.prisma.category.findFirst({
      where: {
        title: title
      }
    });
  }

  public find(): Promise<Category[] | null> {
    return this.prisma.category.findMany();
  }

  public update(id: number, item: CategoryEntity): Promise<Category> {
    return this.prisma.category.update({
      where: {
        id
      },
      data: { ...item.toObject(), id}
    });
  }
}
