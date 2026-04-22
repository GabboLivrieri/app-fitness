import { Exercise } from "./exercise-model";


export interface Workout{
    id: string;
    name: string;
    userId: string;
    exercises: Exercise[];
    totalCaloriesBurned: number;
    createdAt: number;
}