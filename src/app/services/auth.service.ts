import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // This ensures that the service is available throughout the application
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users'; // Update with your backend URL
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  private userRoleSubject = new BehaviorSubject<string>('');
  userRole$ = this.userRoleSubject.asObservable();

  constructor(private http: HttpClient) { 
    if (this.isBrowser()) {
      // Check initial login state from local storage
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      if (token && role) {
        this.isLoggedInSubject.next(true);
        this.userRoleSubject.next(role);
      }
    }
  }

  // Method to register a new user
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, email });
  }

  // Method to login a user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.isLoggedInSubject.next(true);
        this.userRoleSubject.next(response.role);
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next('');
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
