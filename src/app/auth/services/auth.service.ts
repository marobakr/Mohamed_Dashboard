import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  status: number;
  data: {
    token: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://system.osolna.com/api/auth/admin-login';

  constructor(private http: HttpClient) {}

  login(credentials: {
    username: string;
    password: string;
  }): Observable<LoginResponse> {
    const body = {
      field: credentials.username,
      password: credentials.password,
      type: 'admin',
    };

    return this.http.post<LoginResponse>(this.apiUrl, body).pipe(
      tap((response) => {
        if (response.status === 1) {
          localStorage.setItem('token', response.data.token);
        }
      }),
      // use intersecport to catch the error
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
