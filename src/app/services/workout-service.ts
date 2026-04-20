import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { map, Observable } from 'rxjs';
import { Exercise, Workout } from '../models/workout-model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {

    private dbUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/workouts';

    constructor(private firebaseService: FirebaseService) {}

    private calculateTotalCalories(exercises: Exercise[]): number {
        return exercises.reduce((total, ex) => {
            return total + ex.caloriesBurned;
        }, 0);
    }

    getAll(): Observable<Workout[]> {
        return this.firebaseService.get<any>(`${this.dbUrl}.json`).pipe(
            map(data => {
                return data
                    ? Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    }))
                    : [];
            })
        );
    }

    getById(id: string): Observable<Workout> {
        return this.firebaseService.get<any>(`${this.dbUrl}/${id}.json`).pipe(
            map(data => ({
                id,
                ...data
            }))
        );
    }

    create(workoutData: {
        name: string;
        userId: string; 
        exercises: Exercise[];
    }): Observable<Workout> {

        const newWorkout = {
            ...workoutData,
            totalCaloriesBurned: this.calculateTotalCalories(workoutData.exercises),
            createdAt: Date.now(),
        };

        return this.firebaseService.create<any>(`${this.dbUrl}.json`, newWorkout).pipe(
            map(response => ({
                id: response.name,
                ...newWorkout
            }))
        );
    }

    update(workout: Workout) {
        //Come in meal, ricalcola le calorie in caso di modifica esercizi
        const updatedWorkout = {
            ...workout,
            totalCaloriesBurned: this.calculateTotalCalories(workout.exercises)
        };

        return this.firebaseService.update(
            `${this.dbUrl}/${workout.id}.json`,
            updatedWorkout
        );
    }

    delete(id: string) {
        return this.firebaseService.delete(`${this.dbUrl}/${id}.json`);
    }
}