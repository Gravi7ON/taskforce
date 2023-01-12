import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TaskNotifyDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  cost: number;
}
