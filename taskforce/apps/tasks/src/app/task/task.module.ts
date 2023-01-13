import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategoryModule } from '../category/category.module';
import { CommentModule } from '../comment/comment.module';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repositiry';
import { TaskService } from './task.service';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RolesGuard } from './guards/user-role.guard';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { RABBITMQ_SERVICE } from './task.constant';

@Module({
  imports: [
    CategoryModule,
    CommentModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository, JwtStrategy, RolesGuard],
  exports: [TaskRepository]
})
export class TaskModule {}
