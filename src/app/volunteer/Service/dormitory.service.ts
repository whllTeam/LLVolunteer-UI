import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { DormitoryType } from '../Model/Dormitory/dormitoryType';
import { Observable } from 'rxjs';
import { DormitoryTime } from '../Model/Dormitory/dormitoryTime';
import { DormitoryWeek } from '../Model/Dormitory/dormitoryWeek';
import { SignData } from '../Model/Common/signData';
import { SignQuery } from '../Model/Common/volunteerSignQuery';
import { SelfSignData } from '../Model/Common/selfSignData';

@Injectable({
  providedIn: 'root'
})
export class DormitoryService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  apiAuth = `${this.authApi}/dormitory/`;
  apiNoAuth = `${this.noAuthApi}/dormitory/`;
  constructor(private http: HttpClient) { }

  getDormitoryType(): Observable<DormitoryType[]> {
    return this.http.get(`${this.apiNoAuth}dormitoryType`)
      .pipe(map(value =>
        JSON.parse(JSON.stringify(value))
        ));
  }

  getDormitoryTime(): Observable<DormitoryTime[]> {
    return this.http.get(`${this.apiNoAuth}timeDay`)
      .pipe(map(value =>
        JSON.parse(JSON.stringify(value)
      )));
  }

  getDormitoryWeek(): Observable<DormitoryWeek[]> {
    return this.http.get(`${this.apiNoAuth}week`)
      .pipe(map( value =>
        JSON.parse(JSON.stringify(value)
        )));
  }

  /**
   *
   *获得寝室楼值班信息(包含报名人数)
   * @param {SignQuery} query
   * @returns {Observable<SignData[]>}
   * @memberof DormitoryService
   */
  getSignInfo(query: SignQuery): Observable<SignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiNoAuth}sign`, {
      params: params
    }).pipe(map( value =>
      JSON.parse(JSON.stringify(value))));
  }

  /**
   *
   *寝室楼  报名(取消报名)
   * @param {SignQuery} query isSign = 0, 报名 isSign = 1 取消报名
   * @returns {Observable<boolean>}
   * @memberof DormitoryService
   */
  dormitorySign(query: SignQuery): Observable<boolean> {
    //  let params = Object.keys(query).reduce((param, key) => {
    //   param.append(key, query[key]);
    //   return param;
    //  }, new URLSearchParams());
     // post  需要  URLSeachParms
    return this.http.post<boolean>(`${this.apiNoAuth}sign`,
      query,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    ).pipe(map( value =>
      JSON.parse(JSON.stringify(value))));
  }

  /**
   *获取当前用户的寝室楼值班信息
   *
   * @param {SignQuery} query
   * @returns {Observable<SelfSignData[]>}
   * @memberof DormitoryService
   */
  dormitoryGetSelfSign(query: SignQuery): Observable<SelfSignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiNoAuth}signSelf`, {
      params: params
    }).pipe(map( value =>
      JSON.parse(JSON.stringify(value))));
  }
}
