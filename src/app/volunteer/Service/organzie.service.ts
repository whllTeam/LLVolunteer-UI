import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrganizationInfo } from '../Model/Organizations/organizationInfo';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganzieService {

  private authApi = `${environment.apis.authApi}`;
  private noAuthApi = `${environment.apis.noAuthApi}`;
  private api = `${this.noAuthApi}/organization/`;
  constructor(
    private http: HttpClient
  ) { }

  getOrganization(): Observable<OrganizationInfo[]> {
    return this.http.get(this.api)
      .pipe(map( value =>
        JSON.parse(JSON.stringify(value)))
      );
  }
}
