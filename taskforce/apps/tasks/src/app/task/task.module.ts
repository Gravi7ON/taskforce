import { Module } from '@nestjs/common';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repositiry';
import { TaskService } from './task.service';

@Module({
  imports: [CategoryModule, CommentModule],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository]
})
export class TaskModule {}
