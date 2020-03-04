import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ItemsRoutingModule } from './items-routing.module';
import { OfficesComponent } from './offices/offices.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TablesComponent } from './components/tables/tables.component';
import { DormitoryComponent } from './dormitory/dormitory.component';
import { DormitoryTabsComponent } from './components/dormitory-tabs/dormitory-tabs.component';
import { NotifyMessageModule } from '../notify-message/notify-message.module';
registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    NotifyMessageModule
  ],
  declarations: [OfficesComponent, TablesComponent, DormitoryComponent, DormitoryTabsComponent],
})
export class ItemsModule { }
