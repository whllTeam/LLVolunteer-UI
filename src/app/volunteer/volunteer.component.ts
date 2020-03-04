import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../oidc/Service/identity.service';

@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  menuTitle = '登陆';
  isLogin = false;
  constructor(private oidc: IdentityService) {
   }

  ngOnInit() {
    this.oidc.isLoggedInObs()
      .subscribe(value => {
        this.isLogin = value;
        this.menuTitle = this.isLogin ? '注销' : '登陆';
      });
  }
  handelUserInfo() {
    if (this.isLogin) {
      // 注销
      this.oidc.triggerSignOut();
    } else {
      // 登陆
      this.oidc.triggerSignIn();
    }
  }
}
