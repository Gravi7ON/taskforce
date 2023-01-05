import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime.js';
import { AUTH_USER_DATE_BIRTH_MATURE, AUTH_USER_DATE_BIRTH_MATURE_NOT_VALID } from '../auth.constant';

dayjs.extend(relativeTime)

@ValidatorConstraint({ name: 'customCheckDate', async: false })
export class CustomValidationMature implements ValidatorConstraintInterface {
  validate(text: string) {
    return parseInt(
      dayjs(text).fromNow().replace(/\D/gi, ''),
      10
    ) >= AUTH_USER_DATE_BIRTH_MATURE;
  }

  defaultMessage() {
    return AUTH_USER_DATE_BIRTH_MATURE_NOT_VALID
  }
}
