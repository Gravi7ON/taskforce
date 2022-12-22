export class CreateTaskDto {
  title: string;
  description: string;
  category: string;
  cost?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  tags?: string;
  userId: string
}
