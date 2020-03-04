import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignActivityNotes } from '../Model/Common/signActivityNotes';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurtureService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  api = `${this.noAuthApi}/signActivityNotes/`;
  constructor(
    private http: HttpClient
  ) { }

  getActivityNotes(): Observable<SignActivityNotes[]> {
    return this.http.get(`${this.api}signNotes`)
      .pipe(map( value => {
        return JSON.parse(JSON.stringify(value));
      }));
  }
}
