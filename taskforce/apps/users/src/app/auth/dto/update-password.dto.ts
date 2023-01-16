import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'User current password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public currentPassword: string;

  @ApiProperty({
    description: 'User new password',
    example: '654321'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public newPassword: string;
}
