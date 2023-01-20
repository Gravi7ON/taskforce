import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/user-role.guard';
import { PerformerModule } from '../performer/performer.module';

@Module({
  imports: [
    CategoryModule,
    CommentModule,
    PassportModule,
    PerformerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    })
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, JwtStrategy, RolesGuard],
  exports: [TaskRepository]
})
export class TaskModule {}
