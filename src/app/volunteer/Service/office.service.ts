import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { OfficeType } from '../Model/Office/officeType';
import { OfficeTime } from '../Model/Office/officeTime';
import { OfficeyWeek } from '../Model/Office/officeWeek';
import { map } from 'rxjs/operators';
import { SignData } from '../Model/Common/signData';
import { SignQuery } from '../Model/Common/volunteerSignQuery';
import { SelfSignData } from '../Model/Common/selfSignData';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  private apiAuth = `${this.authApi}/office/`;
  private apiNoAuth = `${this.noAuthApi}/office/`;
  constructor(private http: HttpClient) { }

  getOfficeType(): Observable<OfficeType[]> {
    return this.http.get(`${this.apiNoAuth}officeType`)
      .pipe(map(value =>
        JSON.parse(JSON.stringify(value)
      )));
  }

  getOfficeTime(): Observable<OfficeTime[]> {
    return this.http.get(`${this.apiNoAuth}timeDay`)
      .pipe(map(value =>
        JSON.parse(JSON.stringify(value)
      )));
  }

  getOfficeWeek(): Observable<OfficeyWeek[]> {
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
   * @memberof officeService
   */
  getSignInfo(query: SignQuery): Observable<SignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiAuth}sign`, {
      params: params
    }).pipe(map( value =>
      JSON.parse(JSON.stringify(value))));
  }

  /**
   *
   *寝室楼  报名(取消报名)
   * @param {SignQuery} query isSign = 0, 报名 isSign = 1 取消报名
   * @returns {Observable<boolean>}
   * @memberof officeService
   */
  officeSign(query: SignQuery): Observable<boolean> {
     // post  需要  URLSeachParms
    return this.http.post<boolean>(`${this.apiAuth}sign`,
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
   * @memberof officeService
   */
  officeGetSelfSign(query: SignQuery): Observable<SelfSignData[]> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.apiAuth}signSelf`, {
      params: params
    }).pipe(map( value =>
      JSON.parse(JSON.stringify(value))));
  }
}
