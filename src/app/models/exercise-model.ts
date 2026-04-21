import { Difficulty } from "./difficulty-model";
import { MuscleGroup } from "./muscle-group-model";

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
  caloriesBurned: number;
  sets: number;
  reps: number;
  restTime: number;
}