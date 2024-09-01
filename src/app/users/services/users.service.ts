import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserList } from 'src/app/core/interface/IUserList';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://system.osolna.com/api/users';

  constructor(private http: HttpClient) {}

  getUsers(page: number, pageSize: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<any>(this.apiUrl, { params });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createUser(user: IUserList): Observable<IUserList> {
    return this.http.post<IUserList>(`${this.apiUrl}/create`, user);
  }

  updateUser(user: IUserList): Observable<IUserList> {
    return this.http.put<IUserList>(`${this.apiUrl}/${user.id}/edit`, user);
  }
  getCountries(): Observable<any> {
    return this.http.get(
      `https://system.osolna.com/api/countries?return_all=1`
    );
  }
}
