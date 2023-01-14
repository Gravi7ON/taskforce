export interface Performer {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  taskId: number;
  assignee?: boolean;
  statusWork?: string;
  ready?: boolean;
}
