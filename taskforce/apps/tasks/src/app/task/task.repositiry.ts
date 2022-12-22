// import { CRUDRepository } from '@taskforce/core';
import { Injectable } from '@nestjs/common';
import { Task } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task>  {
    const entityData = item.toObject();

    return this.prisma.task.create({
      data: {
        ...entityData,
        category: {
          connect: [...entityData.category]
        },
        comments: {
          connect: []
        },
        performers: {
          connect: []
        }
      },
      include: {
        comments: true,
        category: true,
        performers: true
      }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        id,
      }
    });
  }

  // public update(id: number, item: TaskEntity): Promise<Task> {
  //   return Promise.resolve(undefined);
  // }

  public find(): Promise<Task[]> {
    return this.prisma.task.findMany({
      include: {
        comments: true,
        category: true,
        performers: true
      }
    });
  }

  public async findById(id: number): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        id
      },
      include: {
        comments: true,
        category: true,
        performers: true
      }
    });
  }
}
