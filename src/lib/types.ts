export interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  authorId: string;
  author: User;
  comments: any[];
  createdAt: string;
  deadline: string;
  description: string;
  id: string;
  taskAssistants: Assistant[];
  title: string;
  updatedAt: string;
  isFav: boolean;
  isDone: boolean;
  doneAt: string;
}

export interface Assistant {
  assignedAt: Date;
  assistantId: string;
  id: string;
  taskId: string;
  assistant: User;
}
