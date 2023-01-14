import {
  Body,
  Post,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
  Get,
  Query,
  Patch,
} from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';
import { RolesGuard } from './guards/user-role.guard';
import { CheckAndLowercaseTagPipe } from '../pipes/check-and-lowercase-tag.pipe';
import { MyTaskQuery } from './query/mytask.query';
import { NewTaskQuery } from './query/new-tasks.query';
import { NewTaskRdo } from './rdo/new-task.rdo';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('mytask')
  async findMyTasks(@Request() req, @Query() query: MyTaskQuery) {
    const myTasks = await this.taskService.getMyTasks(req.user, query);

    return myTasks;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(@Body(CheckAndLowercaseTagPipe) dto: CreateTaskDto, @Request() req) {
    const userId = req.user.id;
    const newTask = await this.taskService.createTask({
      ...dto,
      userId
    });

    return fillObject(TaskRdo, newTask);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findNewTasks(@Query() query: NewTaskQuery) {
    const newTasks = await this.taskService.findNewTasks(query);
    return fillObject(NewTaskRdo, newTasks);
  }

  @Get('/:id')
  async findTask(@Param('id', ParseIntPipe) id: number) {
    const existTask = this.taskService.getTask(id)

    return fillObject(TaskRdo, existTask);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto, @Request() req) {
    const userId = req.user.id;
    const updatedPost = await this.taskService.editTask(id, {...dto, userId});
    return fillObject(TaskRdo, updatedPost);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('status/:id')
  async switchTaskStatus(@Param('id', ParseIntPipe) id: number, @Request() req, @Query() query: MyTaskQuery) {
    const updatedPost = await this.taskService.switchStatus(id, req.user, query);
    return fillObject(TaskRdo, updatedPost);
  }
}
