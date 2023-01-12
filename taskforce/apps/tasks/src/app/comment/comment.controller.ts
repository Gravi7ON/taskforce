import { Body, Post, Controller, Delete, HttpStatus, HttpCode, Param, Get, Request, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:id')
  async create(@Body() dto: CreateCommentDto, @Param('id', ParseIntPipe) taskId: number, @Request() req) {
    const newComment = await this.commentService.createComment({
      ...dto,
      userId: req.user.id,
      taskId
    });

    return fillObject(CommentRdo, newComment);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    this.commentService.deleteComment(id);
  }

  @Get('/')
  async index(@Query() query: CommentQuery) {
    const comments = await this.commentService.getComments(query);
    return fillObject(CommentRdo, comments);
  }
}
