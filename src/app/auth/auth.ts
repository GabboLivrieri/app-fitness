import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Auth {

  private apiKey =  "AIzaSyAu7ldXjnhs8ZHHISSzp9TXX2eTmj5rdCY";
  private token: string | null = null;
  private userId: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    if (this.isBrowser()) {
      this.token = localStorage.getItem('token');
      this.userId = localStorage.getItem('userId');
    }
  }

  
  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  register(email: string, password: string): Observable<any> {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        tap((res: any) => {
          this.token = res.idToken;
          this.userId = res.localId;
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
          this.userId = res.localId;

          localStorage.setItem('token', res.idToken);
          localStorage.setItem('userId', res.localId);
        })
      );
  }

  logout() {
  this.token = null;
  this.userId = null;

  if (this.isBrowser()) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    }
  }

  isLogged(): boolean {
  return !!this.token;
  }

  getToken() {
    return this.token;
  }
  getUserId(): string | null {
  return this.userId;
  }
}