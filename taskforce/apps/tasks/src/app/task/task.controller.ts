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
import { createFailedSchemaResponse, fillObject } from '@taskforce/core';
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
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TaskMessage } from './task.constant';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of user tasks',
    type: TaskRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found tasks',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, TaskMessage.NotFound)
  })
  @ApiQuery({
    name: 'My tasks query',
    example: 'status=progress',
    required: false
  })
  @Get('mytask')
  async findMyTasks(@Request() req, @Query() query: MyTaskQuery) {
    const myTasks = await this.taskService.getMyTasks(req.user, query);

    return fillObject(TaskRdo, myTasks)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Your task has been created',
    type: TaskRdo
  })
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
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique task id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task has been deleted',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of new tasks',
    type: [NewTaskRdo]
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found tasks',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, TaskMessage.NotFound)
  })
  @Get('/')
  async findNewTasks(@Query() query: NewTaskQuery) {
    const newTasks = await this.taskService.findNewTasks(query);
    return fillObject(NewTaskRdo, newTasks);
  }

  @ApiParam({
    name: 'id',
    description: 'Unique task id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task',
    type: TaskRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found task',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, TaskMessage.NotFound)
  })
  @ApiQuery({
    name: 'Task query',
    example: 'limit=2&page=2&tag=#kjdhf#kjdfh&sortDirection=asc&sortField=performers&category=1,2&city=Москва',
    required: false
  })
  @Get('/:id')
  async findTask(@Param('id', ParseIntPipe) id: number) {
    const existTask = this.taskService.getTask(id)

    return fillObject(TaskRdo, existTask);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique task id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated Task',
    type: TaskRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found task',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, TaskMessage.NotFound)
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'Only your task',
    schema: createFailedSchemaResponse(HttpStatus.CONFLICT, TaskMessage.ForbidenUpdate)
  })
  @Patch('/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTaskDto, @Request() req) {
    const userId = req.user.id;
    const updatedPost = await this.taskService.editTask(id, {...dto, userId});
    return fillObject(TaskRdo, updatedPost);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique task id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updated status Task',
    type: TaskRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found task',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, TaskMessage.NotFound)
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'Only your task',
    schema: createFailedSchemaResponse(HttpStatus.CONFLICT, TaskMessage.ForbidenUpdate)
  })
  @ApiQuery({
    name: 'Task status query',
    example: 'status=progress&respondId=17&taskId=33'
  })
  @Patch('status/:id')
  async switchTaskStatus(@Param('id', ParseIntPipe) id: number, @Request() req, @Query() query: MyTaskQuery) {
    const updatedPost = await this.taskService.switchStatus(id, req.user, query);
    return fillObject(TaskRdo, updatedPost);
  }
}
