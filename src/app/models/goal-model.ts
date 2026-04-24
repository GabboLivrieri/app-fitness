export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  deadline: string;
  category: 'PESO' | 'ALLENAMENTO' | 'ALIMENTAZIONE';
  completed: boolean;
  createdAt: number;
}