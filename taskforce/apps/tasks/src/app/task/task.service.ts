import { Task } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { TaskRepository } from './task.repositiry';
// import { UpdateTaskDto } from './dto/update-task.dto';

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

  async getTask(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
  //   throw new Error('Not implemented…');
  // }
}
