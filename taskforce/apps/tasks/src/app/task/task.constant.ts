export enum TaskMessage {
  NotFound = 'Task not found',
  DeadlineNotValid = `Task deadline isn't less than current time`,
  ForbidenUpdate = 'Your task might update only',
  ForbidenDelete = 'Your task might delete only',
  QueryRequired = 'Query string is required'
}
export enum TaskStatusMessage {
  ForbiddenCancele = 'Transition is possible since status new',
  ForbiddenProgress = 'Transition is possible since status new and choice performer',
  ForbiddenComplete = 'Transition is possible since status progress',
  ForbiddenNew = 'New status is set on creation task',
  ForbiddenFailed = 'Set failed status only may user with role performer',
  NotFoundPerformer = 'Performer with this id not found',
  PerformerBusy = 'Performer is busy now'
}
export enum TaskQuery {
  DefaultLimit = 25,
  DefaultSortDirection = 'desc',
  DefaultSortFiled = 'createdAt'
}
export const MAX_TAGS = 5;
export const TAGS_NOT_VALID = 'Tags are not valid';
export const RABBITMQ_SERVICE = Symbol('RABBITMQ_SERVICE');
