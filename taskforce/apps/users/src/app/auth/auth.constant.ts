export enum AuthUserMessageException {
  Exists = 'User with this email already exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  DateBirthMature = 18,
  DateBirthMatureNotValid = 'The user date birth is not matureness'
}
export const MAX_AMOUT_OF_SKILLS = 5;
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
