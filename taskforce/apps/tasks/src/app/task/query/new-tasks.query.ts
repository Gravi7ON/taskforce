import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { TaskQuery } from '../task.constant';
import { UserCity } from '@taskforce/shared-types';

export class NewTaskQuery {
  @Transform(({ value } ) => +value || TaskQuery.DefaultLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = TaskQuery.DefaultLimit;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = TaskQuery.DefaultSortDirection;

  @IsIn(['createdAt', 'performers', 'comments'])
  @IsOptional()
  public sortField: 'createdAt' | 'performers' | 'comments' = TaskQuery.DefaultSortFiled;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;

  @Transform(({value}) => value.split(',').map(item => Number(item)))
  @IsOptional()
  public category: Array<number>;

  @IsOptional()
  @IsEnum(UserCity)
  public city: UserCity;

  @IsOptional()
  @IsString()
  public tag: string;
}
