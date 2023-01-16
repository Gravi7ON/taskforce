import { Body, Post, Controller, Delete, HttpStatus, HttpCode, Param, Get, Request, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique comment id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New comment has been created',
    type: CommentRdo
  })
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
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique comment id',
    example: 6
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment has been deleted'
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', ParseIntPipe) id: number) {
    this.commentService.deleteComment(id);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List comments',
    type: [CommentRdo]
  })
  @ApiParam({
    name: 'id',
    description: 'Unique comment id',
    example: 6
  })
  @ApiQuery({
    name: 'Comment query',
    example: 'limit=34&sortDirection=asc&page=2',
    required:false
  })
  @Get('/')
  async index(@Query() query: CommentQuery) {
    const comments = await this.commentService.getComments(query);
    return fillObject(CommentRdo, comments);
  }
}
