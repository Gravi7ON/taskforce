import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { PerformerModule } from './performer/performer.module';
import { CategoryModule } from './category/category.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '../config/jwt.config';
import { ENV_FILE_PATH } from './app.constant';

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
      load: [jwtConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
