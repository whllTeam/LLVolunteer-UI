import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignQuery } from '../Model/Common/volunteerSignQuery';
import { ActivitySignData } from '../activity/activitySignData';
import { ActivitySelfSignData } from '../Model/Organizations/activitySelfSignData';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  apiAuth = `${this.authApi}/activity/`;
  apiNoAuth = `${this.noAuthApi}/activity/`;
  constructor(private http: HttpClient) { }

  activitySign(query: SignQuery): Observable<boolean> {
    return this.http.post(`${this.apiAuth}sign`, query)
     .pipe(map(value =>
        JSON.parse(JSON.stringify(value))
      ));
  }

  getActivitySignInfo(query: SignQuery): Observable<ActivitySignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiNoAuth}sign`, {
      params
    }).pipe(map(value =>
        JSON.parse(JSON.stringify(value))
      ));
  }
  getSignInfoSelf(query: SignQuery): Observable<ActivitySelfSignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiAuth}signSelf`, {
      params
    }).pipe(map(value =>
        JSON.parse(JSON.stringify(value))
      ));
  }
}
