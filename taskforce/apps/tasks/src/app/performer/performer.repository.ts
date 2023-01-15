import { Injectable } from '@nestjs/common';
import { Task } from '@prisma/client';
import { Performer, TaskStatus } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRespondDto } from './dto/create-response.dto';
import { PerformerStatusWork } from '@taskforce/shared-types'

@Injectable()
export class PerformerRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: Performer): Promise<Performer> {
    return this.prisma.performer.create({
      data: { ...item}
    });
  }

  public find({taskId, userId}: CreateRespondDto): Promise<Performer | null> {
    return this.prisma.performer.findFirst({
      where: {
        taskId,
        userId
      }
    });
  }

  public findAll({taskId, userId}): Promise<Performer[]| null> {
    return this.prisma.performer.findMany({
      where: {
        taskId,
        userId,
        statusWork: 'failed'
      }
    });
  }

  public findTask({taskId}: CreateRespondDto): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        id: taskId
      }
    });
  }

  public findById({id}: Performer): Promise<Performer | null> {
    return this.prisma.performer.findFirst({
      where: {
        id
      }
    });
  }

  public update(performer: Performer): Promise<Performer> {
    return this.prisma.performer.update({
      where: {
        id: performer.id
      },
      data: {
        ...performer,
        statusWork: PerformerStatusWork.Failed
      }
    });
  }

  public updateTaskStatus({taskId}: CreateRespondDto): Promise<Task> {
    return this.prisma.task.update({
      where: {
        id: taskId
      },
      data: {status: TaskStatus.Failed}
    })
  }
}
