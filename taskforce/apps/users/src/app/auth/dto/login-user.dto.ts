import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID } from '../auth.constant';

export class LoginUserDto {
  @IsEmail(
    {},
    {message: AUTH_USER_EMAIL_NOT_VALID}
  )
  public email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public passwordHash: string;
}
