import { TaskStatus } from '@taskforce/shared-types';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class MyTaskQuery {
  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus)
  public status: TaskStatus;

  @IsOptional()
  @Transform(({value}) => +value)
  public respondId: number;

  @IsOptional()
  @Transform(({value}) => +value)
  public taskId: number;
}
