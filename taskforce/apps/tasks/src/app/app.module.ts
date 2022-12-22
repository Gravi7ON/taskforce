import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { PerformerModule } from './performer/performer.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TaskModule,
    PrismaModule,
    CategoryModule,
    CommentModule,
    PerformerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
