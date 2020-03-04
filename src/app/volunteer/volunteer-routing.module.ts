import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VolunteerComponent } from './volunteer.component';
import { IndexComponent } from './index/index.component';
import { OrganizeComponent } from './organize/organize.component';
import { AuthenUserRouteGuard } from '../Guard/authen-user-route.guard';
import { UserComponent } from './user/user.component';
import { CurtureVolComponent } from './curture-vol/curture-vol.component';

const routes: Routes = [
  {
    path: 'volunteer', component: VolunteerComponent,
    children: [{
      path: 'index', component: IndexComponent
    },
    {
      path: 'organizations', component: OrganizeComponent
    },
    {
      path: 'items', loadChildren: './items/items.module#ItemsModule'
    },
    {
      path: 'culture', component: CurtureVolComponent
    },
    {
      path: 'user', component: UserComponent, canActivate: [AuthenUserRouteGuard]
    },
    {
      path: '**', component: IndexComponent
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerRoutingModule { }
