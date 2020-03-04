import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../Service/identity.service';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private oidc: IdentityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.oidc.userLoaded$
      .subscribe(userLoader => {
        if (userLoader) {
          // 已登录
          console.log('已登录');
          this.router.navigate(['./']);
        } else {
          if (!environment.production) {
            console.log('user wasnt loader1');
          }
        }
      });
      this.oidc.handleCallback();
  }
}
