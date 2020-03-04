import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficesComponent } from './offices/offices.component';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { AuthenUserRouteGuard } from 'src/app/Guard/authen-user-route.guard';
import { DormitoryComponent } from './dormitory/dormitory.component';
const routes: Routes = [
  {
    path: 'offices', component: OfficesComponent, canActivate: [AuthenUserRouteGuard]
  }, {
    path: 'dormitory', component: DormitoryComponent, canActivate: [AuthenUserRouteGuard]
  }
];

@NgModule({
  imports: [
    NgZorroAntdModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
