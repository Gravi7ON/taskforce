import { Body, Post, Controller, Delete, HttpStatus, HttpCode, Param, Get } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRdo } from './rdo/comment.rdo';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @Post('/')
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.createComment(dto);

    return fillObject(CommentRdo, newComment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {

    this.commentService.deleteComment(id);
  }

  @Get('/')
  async index() {
    const comments = await this.commentService.getComments();
    return fillObject(CommentRdo, comments);
  }
}
