import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './user-memory.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserMemoryRepository, UserService],
  exports: [UserMemoryRepository],
  controllers: [UserController],
})
export class UserModule {}
