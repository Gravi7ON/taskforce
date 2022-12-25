// import { CRUDRepository } from '@taskforce/core';
import { CommentEntity } from './comment.entity';
import { Comment } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

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

  public find(ids: number[] = []): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        id: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
  }
}
