import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime.js';
import { AuthUserMessageException } from '../auth/auth.constant';

dayjs.extend(relativeTime)

@ValidatorConstraint({ name: 'customCheckDate', async: false })
export class CustomValidationMature implements ValidatorConstraintInterface {
  validate(text: string) {
    return parseInt(
      dayjs(text).fromNow().replace(/\D/gi, ''),
      10
    ) >= AuthUserMessageException.DateBirthMature;
  }

  defaultMessage() {
    return AuthUserMessageException.DateBirthMatureNotValid as string
  }
}
