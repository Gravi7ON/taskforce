import { Injectable } from '@nestjs/common';
import { CommentEntity } from './comment.entity';
import { Comment } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentQuery } from './query/comment.query';

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
