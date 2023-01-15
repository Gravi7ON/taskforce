export enum UserMessageException {
  NotFound = 'User not found',
  ForbiddenReview = 'Customer can create review only one time for one task',
  OnlyCompleted = 'Customer can create review if performer finished work and task status set completed',
  TaskNotFound = 'Task not found',
  PerformerNotExucute = 'Performer not execute this task',
  OnlyPerformer = 'Reviews can create customer only to performer'
}
