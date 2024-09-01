import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainApi } from 'src/app/core/constant/baseApI';
import { IUserList } from 'src/app/core/interface/IUserList';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(`${MainApi}/users`, { params });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${MainApi}/users/${id}`);
  }

  createUser(user: IUserList): Observable<IUserList> {
    return this.http.post<IUserList>(`${MainApi}/users/create`, user);
  }

  updateUser(user: IUserList, id: number): Observable<IUserList> {
    return this.http.post<IUserList>(`${MainApi}/users/${id}/edit`, user);
  }
  getCountries(): Observable<any> {
    return this.http.get(`${MainApi}/countries?return_all=1`);
  }
}
