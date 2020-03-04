import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IdentityService } from '../oidc/Service/identity.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenUserRouteGuard implements CanActivate {
  isOpenIdentityService = environment.isOpenIdentity;
  constructor(
    private oidc: IdentityService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // 取消  身份验证
      if ( !this.isOpenIdentityService ) {
        return true;
      }
      let isLoggedIn = this.oidc.isLoggedInObs();
      isLoggedIn.subscribe((loggedin) => {
          if (!loggedin) {
              this.oidc.triggerSignIn();
          }
      });
      return isLoggedIn;
  }
}
