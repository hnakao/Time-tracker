import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';



import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { UserT } from '../models/userT';
import { Response } from './../models/response';

let counter = 0;


@Injectable()
export class UserService {
// Dinamic data
 token: string;

 private baseUrl: string;

  constructor(private http: HttpClient, private global: GlobalService) {
    this.baseUrl = `${this.global.apiUrl()}users`;
  }

  getUsersT() {
    return this.http.get<Response<UserT[]>>(this.baseUrl);
  }

  getUserT(id: string) {
    return this.http.get<Response<UserT>>(`${this.baseUrl}/${id}`);
  }

  createUserT(userT: UserT) {
    return this.http.post(this.baseUrl, userT);
  }

  updateUserT(userT: UserT) {
    return this.http.put(`${this.baseUrl}/${userT.id}`, userT);
  }

  deleteUserT(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getDecodedAccessToken(): any {
    this.token = JSON.parse(localStorage.getItem('auth_app_token')).value;
    try {
        return jwt_decode(this.token);
    } catch (Error) {
        return null;
    }
  }



  // The Theme Default-------------------------------------------------------

  private users = {
    nick: { picture: 'assets/images/nick.png', name: 'Nick Jones',
            last_name: 'Pérez', email: 'operezs1990@gmail.com'},
    eva: { picture: 'assets/images/nick.png', name: 'Eva Moor',
            last_name: 'Pérez', email: 'operezs1990@gmail.com' },
    jack: { picture: 'assets/images/nick.png', name: 'Jack Williams',
            last_name: 'Pérez', email: 'operezs1990@gmail.com' },
    lee: { picture: 'assets/images/nick.png', name: 'Lee Wong',
            last_name: 'Pérez', email: 'operezs1990@gmail.com' },
    alan: { picture: 'assets/images/nick.png', name: 'Alan Thompson',
            last_name: 'Pérez', email: 'operezs1990@gmail.com'},
    kate: { picture: 'assets/images/nick.png', name: 'Kate Martinez',
            last_name: 'Pérez', email: 'operezs1990@gmail.com' },
    admin: { picture: 'assets/images/nick.png', name: 'Admin',
            last_name: 'Pérez', email: 'operezs1990@gmail.com' },
  };

  private userArray: any[];


  getUsers(): Observable<any> {
    return observableOf(this.users);
  }

  getUserArray(): Observable<any[]> {
    return observableOf(this.userArray);
  }

  getUser(): Observable<any> {
    counter = (counter + 1) % this.userArray.length;
    return observableOf(this.userArray[counter]);
  }

  getData() {
    return Object.values(this.users);
  }
}
/*   data: UserT[] = [
    new UserT( 'Orlando', 'Pérez', 'operezs1990@gmail.com'),
    new UserT( 'Oscar', 'Pérez', 'operezs1990@gmail.com'),
    new UserT( 'Eva Moor', 'Pérez', 'operezs1990@gmail.com'),
    new UserT( 'Carlos', 'Pérez', 'operezs1990@gmail.com'),
  ];

  getUsersT(): Observable<UserT[]> {
    return observableOf(this.data);
  }

  createUserT(user: UserT): Observable<UserT[]> {
    this.data.push(user);
    return observableOf(this.data);
  }

  updateUserT(user: UserT): Observable<any> {
    return observableOf(this.data);
  }

  deleteUserT(name: string): Observable<any> {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].userName === name) {
        index = i;
      }
    }
    if (index >= 0)
      this.data.splice(index, 1);
    return observableOf(this.data);
  }
 */
