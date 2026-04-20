import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase-service';
import { map, Observable } from 'rxjs';
import { User } from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private dbUrl = 'https://angular-project-1b5ba-default-rtdb.europe-west1.firebasedatabase.app/users';

  constructor(private firebaseService: FirebaseService) {}

  getAll(): Observable<User[]> {
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

  getById(id: string): Observable<User> {
    return this.firebaseService.get<any>(`${this.dbUrl}/${id}.json`).pipe(
      map(data => ({
        id,
        ...data
      }))
    );
  }

  create(userData: {
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    weight: number;
    height: number;
    role: 'USER' | 'ADMIN';
    subscription: 'FREE' | 'PREMIUM';
  }): Observable<User> {

    const newUser = {
      ...userData,
    };

    return this.firebaseService.create<any>(`${this.dbUrl}.json`, newUser).pipe(
      map(response => ({
        id: response.name,
        ...newUser
      }))
    );
  }

  update(user: User): Observable<User> {
    return this.firebaseService.update<any>(
      `${this.dbUrl}/${user.id}.json`,
      user
    )
  }

  delete(id: string) {
    return this.firebaseService.delete(`${this.dbUrl}/${id}.json`);
  }
}