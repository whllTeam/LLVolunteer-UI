import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SchoolUserInfo } from '../Model/schoolManager/schoolUserInfo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SchoolUserService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  private api = `${this.authApi}/SchoolUserManager/`;
  constructor(
    private http: HttpClient
  ) { }

  getUserInfoByName(userName: string): Observable<SchoolUserInfo> {
    return this.http.get(`${this.api}name`, {
      params: {
        'userName': userName
      }
    }).pipe( map( value => {
      return JSON.parse(JSON.stringify(value));
    }));
  }
}
