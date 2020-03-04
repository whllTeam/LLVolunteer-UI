import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityService } from './Service/identity.service';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SigninComponent, SignoutComponent],
  providers: [ IdentityService]
})
export class OidcModule { }
