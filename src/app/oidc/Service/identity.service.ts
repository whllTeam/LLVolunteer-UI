import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { ReplaySubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

const config = {
  authority: environment.apis.identity,
  client_id: 'clientSpa',
  redirect_uri: `${environment.apis.spaClient}/signin-oidc`,
  response_type: 'id_token token',
  scope: 'openid profile authApi_Volunteer',
  post_logout_redirect_uri : `${environment.apis.spaClient}/signout-callback-oidc`,
  automaticSilentRenew: true,
};
@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  private userManager: UserManager = new UserManager(config);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  private currentUser: User = null;

  /**
   * 登陆状态
   *
   * @memberof IdentityService
   */
  userLoaded$ = new ReplaySubject<boolean>(1);
  loggedIn = false;

  constructor() {
    this.userManager.clearStaleState();

    // 用户  登陆  事件
    this.userManager.events.addUserLoaded(user => {
      if (!environment.production) {
        console.log('User loaded.', user);
      }
      this.currentUser = user;
      this.userLoadededEvent.emit(user);
      this.loggedIn = !(user === undefined);
      this.userLoaded$.next(true);
    });

    // 用户登出事件
    this.userManager.events.addUserUnloaded((e) => {
      if (!environment.production) {
        console.log('User unloaded');
      }
      this.currentUser = null;
      this.userLoadededEvent.emit(null);
      this.loggedIn = false;
      this.userLoaded$.next(false);
    });

    this.userManager.getUser()
    .then((user) => {
      if (user) {
        this.loggedIn = true;
        this.currentUser = user;
        this.userLoadededEvent.emit(user);
      } else {
        this.loggedIn = false;
      }
    })
    .catch((err) => {
      this.loggedIn = false;
    });
  }
/**
   *
   *当前用户是否有效
   * @readonly
   * @type {boolean}
   * @memberof IdentityService
   */
  get userAvailable(): boolean {
    return this.currentUser != null;
  }

  /**
   *得到当前用户
   *
   * @readonly
   * @type {User}
   * @memberof IdentityService
   */
  get user(): User {
    return this.currentUser;
  }
  getUser() {
    this.userManager.getUser().then((user) => {
      this.currentUser = user;
      console.log('got user', user);
      this.userLoadededEvent.emit(user);
    }).catch(function (err) {
      console.log(err);
    });
  }

  removeUser() {
    this.userManager.removeUser().then(() => {
      this.userLoadededEvent.emit(null);
      console.log('user removed');
    }).catch(function (err) {
      console.log(err);
    });
  }
  /**
   *登陆页面
   *
   * @memberof IdentityService
   */
  triggerSignIn() {
    this.userManager.signinRedirect().then(() => {
      if (!environment.production) {
        console.log('Redirection to signin triggered.');
      }
    });
  }

  /**
   *登陆成功跳转
   *
   * @memberof IdentityService
   */
  handleCallback() {
    this.userManager.signinRedirectCallback().then(user => {
      if (!environment.production) {
        console.log('Callback after signin handled.', user);
      }
    });
  }

  handleSilentCallback() {
    this.userManager.signinSilentCallback().then(user => {
      this.currentUser = user;
      if (!environment.production) {
        console.log('Callback after silent signin handled.', user);
      }
    });
  }

  /**
   *登出
   *
   * @memberof IdentityService
   */
  triggerSignOut() {
    this.userManager.signoutRedirect().then(resp => {
      if (!environment.production) {
        console.log('Redirection to sign out triggered.', resp);
      }
    });
  }

  isLoggedInObs(): Observable<boolean> {
    return from(this.userManager.getUser())
        .pipe(map<User, boolean>((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    }));
  }
}
