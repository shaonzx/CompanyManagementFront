import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  expiration: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiBase = 'http://localhost:5084/api/';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiBase}Account/Login`, {
      username,
      password,
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  hasRole(role: string): boolean {
    const userRole = localStorage.getItem('role');
    return userRole === role;
  }

  logout() {
    localStorage.clear();
  }
}
