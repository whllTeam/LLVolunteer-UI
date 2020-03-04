import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule} from 'ng-zorro-antd';
import { OfficeChartComponent } from './office-chart/office-chart.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { DormitoryChartComponent } from './dormitory-chart/dormitory-chart.component';
import { StatisticsService } from './Services/statistics.service';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
  ],
  providers: [StatisticsService],
  declarations: [OfficeChartComponent, TimeLineComponent, DormitoryChartComponent, TodoItemsComponent],
  exports: [OfficeChartComponent, TimeLineComponent, DormitoryChartComponent, TodoItemsComponent]
})
export class StatisticsModule { }
