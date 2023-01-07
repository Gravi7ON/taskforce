import { Task, TaskStatus, TokenPayload, UserRole } from '@taskforce/shared-types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repositiry';
import { TASK_NOT_FOUND } from './task.constant';
import { MyTaskQuery } from './query/mytask.query';
// import { UpdateTaskDto } from './dto/update-task.dto';

const SORT_TASK_STATUS_RANK = {
  'new': 0,
  'progress': 1,
  'completed': 2,
  'canceled': 3,
  'failed': 4
};

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const taskEntity = new TaskEntity(dto);

    return this.taskRepository.create(taskEntity);
  }

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number): Promise<Task | null> {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    return existTask;
  }

  async getMyTasks(user: TokenPayload, query: MyTaskQuery): Promise<Task[]> {
    const tasks = await this.taskRepository.find(user, query);

    if (tasks.length === 0) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    let isTasksIncludeNewSatatus: string;
    for (const task of tasks) {
      if (task.status === TaskStatus.New) {
        isTasksIncludeNewSatatus = task.status;
        break;
      }
    }

    if (user.role === UserRole.Performer && isTasksIncludeNewSatatus) {
      return tasks.sort((task, otherTask) => SORT_TASK_STATUS_RANK[task.status] - SORT_TASK_STATUS_RANK[otherTask.status])
    }

    return tasks
  }

  // async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
  //   throw new Error('Not implemented…');
  // }
}
