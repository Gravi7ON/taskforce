import { TaskStatus } from './task-status.enum';

export interface Task {
  _id: string;
  header: string;
  description: string;
  category: string;
  cost?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string;
  status: TaskStatus;
}
