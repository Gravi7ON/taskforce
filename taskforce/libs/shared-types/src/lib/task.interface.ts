import { Category } from './category.interface';
import { TaskStatus } from './task-status.enum';
import { Comment } from './comment.interface';
import { Performer } from './performer.interface';

export interface Task {
  id?: string;
  title: string;
  description: string;
  category: Category[];
  cost?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  comments: Comment[];
  performers: Performer[];
}
