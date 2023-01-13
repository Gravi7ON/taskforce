import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { PerformerModule } from './performer/performer.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';
import { rabbitMqOptions } from '../config/rabbitmq.config';
import { NotifySchedulerModule } from './notify-scheduler/notify-scheduler.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    CategoryModule,
    CommentModule,
    PerformerModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [jwtConfig, rabbitMqOptions],
    }),
    NotifySchedulerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
