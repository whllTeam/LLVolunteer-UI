import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseMessage } from '../Model/Common/responseMessage';
import { UserLogin } from '../Model/schoolManager/userLogin';
import { map } from 'rxjs/operators';
import { UserInfoAuth } from '../Model/schoolManager/userInfoAuth';
import { SchoolUserInfoDetailInfo } from '../Model/schoolManager/schoolUserDetailInfo';

@Injectable({
  providedIn: 'root'
})
export class SchoolInfoService {
  private schoolManagerGateWay = `${environment.apis.schoolManagerGateway}/`;
  constructor(
    private http: HttpClient
  ) { }

  getValidateCode(): Observable<any> {
    return this.http.get(`${this.schoolManagerGateWay}SchoolUser/base64`, {
      observe: 'response',
      responseType: 'text'
    });
  }
  /**
   * 通过教务网 认证信息
   *
   * @param {UserLogin} query
   * @returns {Observable<ResponseMessage<UserInfoAuth>>}
   * @memberof SchoolInfoService
   */
  authorizeUserInfo(query: UserLogin): Observable<ResponseMessage<UserInfoAuth>> {
    return this.http.post(`${this.schoolManagerGateWay}SchoolUser`, query).pipe( map( value => {
      return JSON.parse(JSON.stringify(value));
    }));
  }

  /**
   *
   * 获取详细信息
   * @param {string} uid 学号
   * @param {string} userName 登陆名
   * @returns {Observable<ResponseMessage<SchoolUserInfoDetailInfo>>}
   * @memberof SchoolInfoService
   */
  getSchoolUserInfo(uid: string, userName: string ): Observable<ResponseMessage<SchoolUserInfoDetailInfo>> {
    return this.http.get(`${this.schoolManagerGateWay}SchoolUser/userInfo/${uid}`, {
      params: {
        'userName': userName
      }
    }).pipe( map( value => {
      return JSON.parse(JSON.stringify(value));
    }));
  }
}
