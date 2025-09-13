export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  estimatedHours: number;
  createdAt: Date;
}

export interface ProjectRequest {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
}