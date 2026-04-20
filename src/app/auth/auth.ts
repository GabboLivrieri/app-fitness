import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {

  private apiKey =  "AIzaSyAu7ldXjnhs8ZHHISSzp9TXX2eTmj5rdCY";
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  register(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        tap((res: any) => {
          this.token = res.idToken;
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        tap((res: any) => {
          this.token = res.idToken;
        })
      );
  }

  logout() {
    this.token = null;
  }

  isLogged(): boolean {
    return this.token !== null;
  }

  getToken() {
    return this.token;
  }
}