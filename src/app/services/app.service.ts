import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IauthResponse } from '../models/auth-response.interface';
import { IcurrentUser } from '../models/current-user.interface';
import { IregRequest } from '../models/reg-request.interface';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  register(user: IregRequest): Observable<IcurrentUser> {
    console.log(user);

    const url = environment.apiUrl + '/users';
    return this.http
      .post<IauthResponse>(url, user)
      .pipe(map((response: IauthResponse) => response.user));
  }
}
