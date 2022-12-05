import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { MyTaskModule } from './my-task/my-task.module';

@Module({
  imports: [TaskModule, MyTaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
