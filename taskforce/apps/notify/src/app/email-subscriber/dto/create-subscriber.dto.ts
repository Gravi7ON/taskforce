import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  EMAIL_NOT_VALID,
  NAME_IS_EMPTY,
} from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  email: string;

  @IsNotEmpty({ message: NAME_IS_EMPTY })
  name: string;
}
