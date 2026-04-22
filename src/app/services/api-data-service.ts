import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from './firebase-service';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService {

  private apiWorkoutUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/api-workout';

  constructor(private http: HttpClient, private firebase: FirebaseService) {}

  getRecipes() {
    return this.http.get(
      'https://www.themealdb.com/api/json/v1/1/search.php?s='
    );
  }

  getRecipesById(id: string) {
    return this.http.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
  }

  getWorkouts() {
    return this.firebase.get<any>(`${this.apiWorkoutUrl}.json`);
  }

  getWorkoutsById(id: string) {
    return this.firebase.get<any>(`${this.apiWorkoutUrl}/${id}.json`);
  }
}