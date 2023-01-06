import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { DEFAULT_COMMENT_COUNT_LIMIT, DEFAULT_SORT_DIRECTION } from '../comment.constant'

export class CommentQuery {
  @Transform(({ value } ) => +value || DEFAULT_COMMENT_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_COMMENT_COUNT_LIMIT;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
