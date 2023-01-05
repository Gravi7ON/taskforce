import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public currentPassword: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public newPassword: string;
}
