export enum UserMessageException {
  NotFound = 'User not found',
  ForbiddenReview = 'Customer can create review only one time for one task',
  OnlyCompleted = 'Customer can create review if performer finished work and task status set completed',
  TaskNotFound = 'Task not found',
  PerformerNotExucute = 'Performer not execute this task',
  OnlyPerformer = 'Reviews can create customer only to performer'
}
export const TASK_URL = 'http://localhost:3333/api/task';
export const PERFORMER_URL = 'http://localhost:3333/api/performer/responds';
