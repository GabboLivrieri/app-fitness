import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../auth/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {

    constructor(
        private http: HttpClient,
        private auth: Auth
    ){}

    private authUrl(url: string) {
    const token = this.auth.getToken();
    if (!token) return url;
    return `${url}?auth=${token}`;
  }

    create<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(this.authUrl(url), body);
    }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.authUrl(url));
    }

    update<T>(url: string, body: any): Observable<T> {
        return this.http.patch<T>(this.authUrl(url), body);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(this.authUrl(url));
    }
    
}