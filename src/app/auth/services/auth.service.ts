import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MainApi } from 'src/app/core/constant/baseApI';
import { LoginResponse } from 'src/app/core/interface/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
    return this.http
      .post<LoginResponse>(`${MainApi}/auth/admin-login`, body)
      .pipe(
        tap((response) => {
          if (response.status === 1) {
            localStorage.setItem('token', response.data.token);
          }
        }),
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
