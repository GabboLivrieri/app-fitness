export interface Ingredient {
  id: string;
  name: string;
  calories: number;
}

export interface Meal {
  id: string;
  name: string;
  userId: string;
  ingredients: Ingredient[];
  totalCalories: number;
  description: string;
  createdAt: number;
}