import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { VolunteerRoutingModule } from './volunteer-routing.module';
import { VolunteerComponent } from './volunteer.component';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { VolunteerService } from './Service/volunteer.service';
import { HttpClientModule } from '@angular/common/http';
import { OrganizeComponent } from './organize/organize.component';
import { UserComponent } from './user/user.component';
import { StatisticsModule } from './statistics/statistics.module';
import { OfficeService } from './Service/office.service';
import { DormitoryService } from './Service/dormitory.service';
import { OrganzieService } from './Service/organzie.service';
import { CurtureVolComponent } from './curture-vol/curture-vol.component';
import { CurtureService } from './Service/curture.service';
import { NotifyMessageModule } from './notify-message/notify-message.module';
import { ModalForAuthorizComponent } from './user/modal-for-authoriz/modal-for-authoriz.component';
import { SchoolInfoService } from './Service/school-info.service';
import { ModalForDetailComponent } from './user/modal-for-detail/modal-for-detail.component';
registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    VolunteerRoutingModule,
    StatisticsModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifyMessageModule
  ],
  entryComponents: [
    ModalForAuthorizComponent, ModalForDetailComponent],
  declarations: [
    VolunteerComponent, IndexComponent,
    OrganizeComponent, UserComponent, CurtureVolComponent,
    ModalForAuthorizComponent, ModalForDetailComponent],
  providers: [VolunteerService, OfficeService, DormitoryService, OrganzieService, CurtureService, SchoolInfoService ]
})
export class VolunteerModule { }
