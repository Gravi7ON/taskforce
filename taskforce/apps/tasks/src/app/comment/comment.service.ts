import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repositiry';
import { CommentQuery } from './query/comment.query';


@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository
  ) {}

  async createComment(dto: CreateCommentDto): Promise<Comment> {
    const commentEntity = new CommentEntity(dto);

    return this.commentRepository.create(commentEntity);
  }

  async deleteComment(id: number): Promise<void> {
    this.commentRepository.destroy(id);
  }

  async getComments(query: CommentQuery): Promise<Comment[]> {
    return this.commentRepository.find(query);
  }
}
