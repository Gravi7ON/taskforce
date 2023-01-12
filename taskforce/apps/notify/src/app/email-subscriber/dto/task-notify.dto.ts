import { IsNotEmpty, IsNumber } from 'class-validator';

export class TaskNotifyDto {
  @IsNotEmpty()
  @IsNumber()
  taskAmount: number;
}
