import { Injectable, Logger } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './query/comment.query';
import { Prisma } from '@prisma/client';
import { COMMENT_NOT_FOUND } from './comment.constant';

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: { ...item.toObject() }
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
       id,
      }
    });
    try {
      await this.prisma.task.delete({
        where: {
          id
        }
      });
    } catch(error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        Logger.log(
          COMMENT_NOT_FOUND
        );
      }
    }
  }

  public find({limit, sortDirection, page}: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      take: limit,
      orderBy: [
        {
          createdAt: sortDirection
        }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined
    });
  }
}
