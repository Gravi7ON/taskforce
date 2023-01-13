import { CreateTaskDto } from './create-task.dto';

export type UpdateTaskDto = Omit<
CreateTaskDto,
'id'|'createdAt'|'updatedAt'|'comments'|'performers'
>
