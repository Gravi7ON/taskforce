import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import * as dayjs from 'dayjs';
import { TaskMessage } from '../task/task.constant';

@ValidatorConstraint({ name: 'customCheckDate', async: false })
export class CustomValidationDeadline implements ValidatorConstraintInterface {
  validate(text: string) {
    return dayjs(text).toDate() > dayjs(Date.now()).toDate();
  }

  defaultMessage() {
    return TaskMessage.DeadlineNotValid as string;
  }
}
