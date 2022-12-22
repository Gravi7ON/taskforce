import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repositiry';

@Module({
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
  exports: [CommentRepository]
})
export class CommentModule {}
