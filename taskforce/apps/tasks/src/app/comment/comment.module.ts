import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { CommentQuery } from './query/comment.query';

@Module({
  providers: [CommentService, CommentRepository, CommentQuery],
  controllers: [CommentController],
  exports: [CommentRepository]
})
export class CommentModule {}
