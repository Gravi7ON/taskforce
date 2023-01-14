// import { CRUDRepository } from '@taskforce/core';
import { Injectable, Logger } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { CRUDRepository } from '@taskforce/core';
import { Performer, PerformerStatusWork, Task, TokenPayload, UserRole } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { MyTaskQuery } from './query/mytask.query';
import { TaskEntity } from './task.entity';
import { Prisma } from '@prisma/client';
import { TaskMessage } from './task.constant';
import { NewTaskQuery } from './query/new-tasks.query';

@Injectable()
export class TaskRepository implements CRUDRepository<TaskEntity, number, Task> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TaskEntity): Promise<Task>  {
    const entityData = item.toObject();
    return this.prisma.task.create({
      data: {
        ...entityData,
        deadline: dayjs(entityData.deadline).toDate(),
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
    try {
      await this.prisma.task.delete({
        where: {
          id
        }
      });
    } catch(error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        Logger.log(
          TaskMessage.NotFound
        );
      }
    }
  }

  public update(id: number, item: TaskEntity): Promise<Task> {
    const task = item.toObject();

    return this.prisma.task.update({
      where: {
        id
      },
      data: {
        ...task,
        deadline: dayjs(task.deadline).toDate(),
        category: {
          connect: [...task.category]
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

  public updatePerformer(respondId: number, isComplete?: boolean): Promise<Performer> {
    return this.prisma.performer.update({
      where: {
        id: respondId
      },
      data: {
        assignee: true,
        statusWork: isComplete && PerformerStatusWork.Complete
      }
    });
  }

  public findPerformer(query: MyTaskQuery): Promise<Performer | null> {
    return this.prisma.performer.findFirst({
      where: {
        id: query.respondId,
        taskId: query.taskId
      },
    });
  }

  public find(user: TokenPayload, {status}: MyTaskQuery): Promise<Task[] | null> {
    if (user.role === UserRole.Performer) {
      return this.prisma.task.findMany({
        where: {
          status: undefined || status,
          performers: {
            every: {
              userId: {
                in: user.id
              }
            }
          }
        },
        include: {
          comments: true,
          category: true,
          performers: true
        }
      })
    }

    return this.prisma.task.findMany({
      where: {
        status: undefined || status,
        userId: user.id
      },
      include: {
        comments: true,
        category: true,
        performers: true
      },
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });
  }

  public async findNewTasks({limit, page, tag, sortDirection, sortField, category, city}: NewTaskQuery): Promise<Task[] | null> {
    return this.prisma.task.findMany({
      where: {
        status: 'new',
        category: {
          some: {
            id: {
              in: category
            }
          }
        },
        address: {
          contains: city
        },
        tags: {
          contains: tag
        }
      },
      take: limit,
      include: {
        comments: true,
        category: true,
        performers: true
      },
      orderBy: sortField === 'performers' ? [
        {
          performers: {
            _count: 'desc'
          }
        }
      ] : sortField === 'comments' ? [
        {
          comments: {
            _count: 'desc'
          }
        },
      ] : [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
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
