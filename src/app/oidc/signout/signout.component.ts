import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../Service/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(
    private oidc: IdentityService,
    private router: Router
    ) { }

  ngOnInit() {
    setInterval( () => {
      this.router.navigate(['/volunteer']);
    }, 500);
  }
}
