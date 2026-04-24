    import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { Observable, map } from 'rxjs';
import { Goal } from '../models/goal-model';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private dbUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/goals';

  constructor(private firebaseService: FirebaseService) {}

  create(goal: Omit<Goal, 'id'>): Observable<any> {
    return this.firebaseService.create(`${this.dbUrl}.json`, goal);
  }

  getByUserId(userId: string): Observable<Goal[]> {
    return this.firebaseService.get<any>(`${this.dbUrl}.json`).pipe(
      map(data => data
        ? Object.keys(data)
            .map(key => ({ id: key, ...data[key] }))
            .filter((g: Goal) => g.userId === userId)
        : []
      )
    );
  }

  complete(goalId: string): Observable<any> {
    return this.firebaseService.update(`${this.dbUrl}/${goalId}.json`, { completed: true });
  }

  delete(goalId: string): Observable<any> {
    return this.firebaseService.delete(`${this.dbUrl}/${goalId}.json`);
  }
}