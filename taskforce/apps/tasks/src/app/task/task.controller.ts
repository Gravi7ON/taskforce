import { Body, Post, Controller, Delete, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CreateTaskDto } from './dto/create-task.dto';
// import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @Post('/')
  async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);

    return fillObject(TaskRdo, newTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const taskId = parseInt(id, 10);
    this.taskService.deleteTask(taskId);
  }

  // @Patch('/:id')
  // async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
  //   const postId = parseInt(id, 10);
  //   const updatedPost = await this.taskService.updateTask(postId, dto);
  //   return fillObject(TaskRdo, updatedPost)
  // }
}
