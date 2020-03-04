import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRegister } from '../Model/signup/userRegister';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private userManager = ` ${environment.apis.userManagerGateway}`;
  private api = `${this.userManager}/UserManager`;
  constructor(private http: HttpClient) { }

  checkHasUserName(userName: string): Observable<boolean> {
    return this.http.get(`${this.api}`, {
      params: { userName: userName}
    }).pipe(map( value => {
      return JSON.parse(JSON.stringify(value));
    }));
  }

  addUser(user: UserRegister): Observable<any> {
    return this.http.post(`${this.api}`, user)
      .pipe(map( value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }
}
