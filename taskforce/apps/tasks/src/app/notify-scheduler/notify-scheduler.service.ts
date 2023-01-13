import { CronJob } from 'cron';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from '../prisma/prisma.service';
import { RABBITMQ_SERVICE } from '../task/task.constant';
import { CommandEvent, Task } from '@taskforce/shared-types';
import { createEvent } from '@taskforce/core';

@Injectable()
export class NotifySchedulerService {
  public lastNotify: string;
  constructor(
    private readonly prisma: PrismaService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {
    this.cronExecutor = this.cronExecutor.bind(this)
    this.planScheduleNotify();
  }

  public async planScheduleNotify() {
    this.lastNotify = new Date().toISOString();
    new CronJob(
      '0 0 * * 1-5',
      this.cronExecutor,
      null,
      true
    )
  }

  public async cronExecutor() {
    const newTasks = await this.getNewTasks();

    if(newTasks.length === 0) {
      return;
    }

    this.rabbitClient.emit(
      createEvent(CommandEvent.SendTask),
      {
        taskAmount: newTasks.length
      }
    );
  }

  public async getNewTasks(): Promise<Task[] | null> {
    const newTasks = await this.prisma.task.findMany({
      where: {
        createdAt: {
          gt: this.lastNotify
        }
      },
      include: {
        category: true
      }
    })

    this.lastNotify = new Date().toISOString();
    return newTasks
  }
}
