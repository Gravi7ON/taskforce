import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRespondDto {
  @IsNumber()
  public taskId: number;

  @IsString()
  @IsOptional()
  public userId: string;

  @IsBoolean()
  @IsOptional()
  public ready: boolean;
}
