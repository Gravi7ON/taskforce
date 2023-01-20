import { Task, TaskStatus, TokenPayload, UserRole } from '@taskforce/shared-types';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskMessage, TaskStatusMessage } from './task.constant';
import { MyTaskQuery } from './query/mytask.query';
import { UpdateTaskDto } from './dto/update-task.dto';
import { NewTaskQuery } from './query/new-tasks.query';

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
    private readonly taskRepository: TaskRepository,
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
      throw new NotFoundException(TaskMessage.NotFound);
    }

    return existTask;
  }

  async findNewTasks(query: NewTaskQuery): Promise<Task[] | null> {
    const newTasks = await this.taskRepository.findNewTasks(query);

    if (newTasks.length === 0) {
      throw new NotFoundException(TaskMessage.NotFound);
    }

    return newTasks;
  }

  async getMyTasks(user: TokenPayload, query: MyTaskQuery): Promise<Task[]> {
    const tasks = await this.taskRepository.find(user, query);

    if (tasks.length === 0) {
      throw new NotFoundException(TaskMessage.NotFound);
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

  async editTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TaskMessage.NotFound);
    }

    if (existTask.userId !== dto.userId) {
      throw new ConflictException(TaskMessage.ForbidenUpdate);
    }

    const taskEntity = new TaskEntity({...existTask, ...dto});

    return this.taskRepository.update(id, taskEntity)
  }

  async switchStatus(id: number, user: TokenPayload, query: MyTaskQuery): Promise<Task> {
    const existTask = await this.taskRepository.findById(id);

    if (!existTask) {
      throw new NotFoundException(TaskMessage.NotFound);
    }

    if (existTask.userId !== user.id) {
      throw new ConflictException(TaskMessage.ForbidenUpdate);
    }

    if (!query.status) {
      throw new BadRequestException(TaskMessage.QueryRequired)
    }

    switch(query.status) {
      case TaskStatus.New:
        throw new BadRequestException(`${TaskStatusMessage.ForbiddenNew}, now status ${existTask.status }`);
      case TaskStatus.Failed:
        throw new BadRequestException(`${TaskStatusMessage.ForbiddenFailed}, now status ${existTask.status }`);
      case TaskStatus.Canceled:
        if (existTask.status !== TaskStatus.New) {
          throw new BadRequestException(`${TaskStatusMessage.ForbiddenCancele}, now status ${existTask.status }`);
        }
        break;
      case TaskStatus.Completed:
        if (existTask.status !== TaskStatus.Progress) {
          throw new BadRequestException(`${TaskStatusMessage.ForbiddenComplete}, now status ${existTask.status }`);
        }
        await this.taskRepository.updatePerformer(Number(query.respondId), true);
        break;
      case TaskStatus.Progress:
        if (existTask.status !== TaskStatus.New || !query.respondId) {
          throw new BadRequestException(`${TaskStatusMessage.ForbiddenProgress}, now status ${existTask.status }`);
        }

        if (!await this.taskRepository.findPerformer(query)) {
          throw new NotFoundException(TaskStatusMessage.NotFoundPerformer);
        }

        if ((await this.taskRepository.findPerformer(query)).assignee) {
          throw new ConflictException(TaskStatusMessage.PerformerBusy);
        }

        await this.taskRepository.updatePerformer(query.respondId);
    }

    const taskEntity = new TaskEntity({...existTask, ...query});

    return this.taskRepository.update(id, taskEntity);
  }
}
