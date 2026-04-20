export interface Food {
  id: string;
  name: string;
  calories: number;
}

export interface Meal {
  id: string;
  name: string;
  userId: string;
  foods: Food[];
  totalCalories: number;
  createdAt: Date;
  updatedAt: Date;
}