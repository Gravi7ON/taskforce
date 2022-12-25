import { Comment } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './comment.repositiry';


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
    this.commentRepository.destroy(Number(id));
  }

  async getComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }
}
