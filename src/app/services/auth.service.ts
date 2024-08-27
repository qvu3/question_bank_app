import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // This ensures that the service is available throughout the application
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/users'; // Update with your backend URL

  constructor(private http: HttpClient) { }

  // Method to register a new user
  register(username: string, password: string, email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, email });
  }

  // Method to login a user
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }
}
