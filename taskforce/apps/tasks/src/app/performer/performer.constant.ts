export enum PerformerMessageException {
  Exists = 'You already created task respond',
  NotFound = 'Not found this task',
  ForbiddenReject = `You haven't responded this task`,
  AlreadyReject  = 'Yoy already reject task',
  NotReject = 'You may reject if you have choosen customer for execute task',
  OnlyNew = 'You can only respond of new tasks'
}
