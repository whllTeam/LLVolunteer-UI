import { Routes } from '@angular/router';
import { SigninComponent } from '../oidc/signin/signin.component';
import { SignoutComponent } from '../oidc/signout/signout.component';
import { NotFoundPageComponent } from '../not-found-page/not-found-page.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Routes = [
  {path: 'volunteer', loadChildren: './volunteer/volunteer.module#VolunteerModule'},
  {path: 'signin-oidc', component: SigninComponent},
  {path: 'signout-callback-oidc', component: SignoutComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', pathMatch: 'full', redirectTo: 'volunteer'},
  {path: '**', component: NotFoundPageComponent}
];

export const routeDatas = routes;
