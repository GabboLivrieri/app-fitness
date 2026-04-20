import { MuscleGroup } from "./muscle-group-model";
export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  difficulty: Difficulty;
  caloriesBurned: number;
}


export interface Workout{
    id: string;
    name: string;
    userId: string;
    exercises: Exercise[];
    totalCalories: number;
    createdAt: Date;
    updatedAt: Date;

}