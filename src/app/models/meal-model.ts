import { Ingredient } from "./ingredient-model";

export interface Meal {
  id: string;
  name: string;
  userId: string;
  ingredients: Ingredient[];
  totalCalories: number;
  description?: string;
  createdAt: number;
}