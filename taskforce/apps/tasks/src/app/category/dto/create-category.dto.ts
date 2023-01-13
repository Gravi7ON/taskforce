import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public title: string;
}
