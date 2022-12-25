import { Performer, Comment, Category } from '@taskforce/shared-types';

export class CreateTaskDto {
  id?: number;
  title: string;
  description: string;
  category: Category[];
  cost?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  comments?: Comment[];
  performers?: Performer[];
}
