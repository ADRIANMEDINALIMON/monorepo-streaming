import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface LoginResp {
  message: string;
  user?: { id: number; username: string; email: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly URL = `${environment.API_URL}/users`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResp> {
    return this.http.post<LoginResp>(
      `${this.URL}/login`,
      { email, password }
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
