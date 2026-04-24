import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { map, Observable } from 'rxjs';
import {  Meal } from '../models/meal-model';
import { Ingredient } from '../models/ingredient-model';

@Injectable({
  providedIn: 'root',
})
export class MealService {
 
  private dbUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/meals';

  constructor(private firebaseService: FirebaseService) {}

 
  private calculateTotalCalories(ingredients: Ingredient[]): number {
    return ingredients.reduce((total, ingredient) => {
      return total + ingredient.calories;
    }, 0);
  }

  getAll(): Observable<Meal[]> {
    return this.firebaseService.get<any>(`${this.dbUrl}.json`).pipe(
      map(data => {
        return data
          ? Object.keys(data).map(key => ({
              id: key,
              ...data[key],
            }))
          : [];
      })
    );
  }


  getById(id: string): Observable<Meal> {
    return this.firebaseService.get<any>(`${this.dbUrl}/${id}.json`).pipe(
      map(data => ({
        id,
        ...data
      }))
    );
  }

  getByUserId(userId: string): Observable<Meal[]> {
    return this.getAll().pipe(
      map(meals =>
        meals.filter(m => m.userId === userId)
      )
    );
  }

  create(mealData: {
    name: string;
    userId: string;
    ingredients: Ingredient[];
    description?: string;
  }): Observable<Meal> {

    const newMeal = {
      ...mealData,
      totalCalories: this.calculateTotalCalories(mealData.ingredients || []),
      createdAt: Date.now(),
    };

    return this.firebaseService.create<any>(`${this.dbUrl}.json`, newMeal).pipe(
      map(response => ({
        id: response.name,
        ...newMeal
      }))
    );
  }

  update(meal: Meal): Observable<void> {
    //Riconta le calorie in caso di modifica ingredienti
    const updatedMeal = {
      ...meal,
      totalCalories: this.calculateTotalCalories(meal.ingredients || [])
    };

    return this.firebaseService.update<any>(
      `${this.dbUrl}/${meal.id}.json`,
      updatedMeal
    )
  }

  delete(id: string) {
    return this.firebaseService.delete(`${this.dbUrl}/${id}.json`);
  }
}