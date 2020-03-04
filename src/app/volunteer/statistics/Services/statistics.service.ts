import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignQuery } from '../../Model/Common/volunteerSignQuery';
import { Observable } from 'rxjs';
import { VolunteerCount } from '../../Model/Common/volunteerCount';
import { map } from 'rxjs/operators';
import { SignActivityNotes } from '../../Model/Common/signActivityNotes';
import { TodoInfoRequest } from '../../Model/user/todoInfoRequest';
import { PageList } from '../../Model/pageList';
import { TodoInfoData } from '../../Model/user/todoInfoData';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  constructor(
    private http: HttpClient
  ) { }

  getDormitorySignCount(query: SignQuery): Observable<VolunteerCount[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.authApi}/dormitory/signCount`, {
      params: params
    }).pipe(map( value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }

  getOfficeSignCount(query: SignQuery): Observable<VolunteerCount[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.authApi}/office/signCount`, {
      params: params
    }).pipe(map( value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }

  getSignActivityNotes(userName: string): Observable<SignActivityNotes[]> {
    return this.http.get(`${this.authApi}/signActivityNotes`, {
      params: {
        userName: userName
      }
    }).pipe(map(value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }

  getTodo(query: TodoInfoRequest): Observable<PageList<TodoInfoData>> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.authApi}/UserVolunteer/todoInfoQuery`, {
      params
    })
      .pipe( map( value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }
}
