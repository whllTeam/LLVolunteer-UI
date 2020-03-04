import { Injectable } from '@angular/core';
import { map} from 'rxjs/operators';
import { Observable, of, pipe } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageInfo } from '../Model/Essay/pageInfo';
import { PageList } from '../Model/pageList';
import { QueryParameters } from '../Model/Common/queryParams';

@Injectable({
  providedIn: 'root'
})

export class VolunteerService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  private api = `${this.noAuthApi}/pageInfo/`;
  constructor(
    private http: HttpClient) {}

  getIndexData(query: QueryParameters): Observable<PageList<PageInfo>> {
    let params = Object.keys(query).reduce((param, key) => {
      return param.set(key, query[key]);
    }, new HttpParams());
    return this.http.get(`${this.api}`, {
      params: params
    }).pipe( map( value =>
      JSON.parse(JSON.stringify(value)))
      );
  }
}
