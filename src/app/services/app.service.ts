import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IauthRequest } from '../models/auth-request.interface';
import { IauthResponse } from '../models/auth-response.interface';
import { IcurrentUser } from '../models/current-user.interface';
import { IregRequest } from '../models/reg-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getUser(response: IauthResponse): IcurrentUser {
    console.log('get response', response);

    return response.user;
  }

  register(user: IregRequest): Observable<IcurrentUser> {
    const url = environment.apiUrl + '/users';
    return this.http.post<IauthResponse>(url, user).pipe(map(this.getUser));
  }

  login(user: IauthRequest): Observable<IcurrentUser> {
    const url = environment.apiUrl + '/users/login';
    return this.http.post<IauthResponse>(url, user).pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<IcurrentUser> {
    const url = environment.apiUrl + '/user';
    return this.http.get<IauthResponse>(url).pipe(map(this.getUser));
  }
}
