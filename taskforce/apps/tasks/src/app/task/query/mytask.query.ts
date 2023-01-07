import { TaskStatus } from '@taskforce/shared-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class MyTaskQuery {
  @IsString()
  @IsOptional()
  @IsEnum(TaskStatus)
  public status: TaskStatus;
}
