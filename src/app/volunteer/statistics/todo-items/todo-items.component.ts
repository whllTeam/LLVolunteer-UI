import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../Services/statistics.service';
import { TodoInfoData } from '../../Model/user/todoInfoData';
import { IdentityService } from 'src/app/oidc/Service/identity.service';
import { TodoInfoRequest } from '../../Model/user/todoInfoRequest';
import { Volunteer_AllActivity } from '../../Model/ConstValue/const';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {

  isCurrentWeek = false;
  userName: string;
  pageIndex = 1;
  pageSize = 10;
  pageTotalCount: number;
  todoItems: TodoInfoData[];
  constructor(
    private service: StatisticsService,
    private oidc: IdentityService
  ) { }

  ngOnInit() {
    let $this = this;
    this.oidc.isLoggedInObs()
      .subscribe(load => {
        if (load) {
          this.userName = this.oidc.user.profile['name'];
          const parms = new TodoInfoRequest(
            this.userName,
             this.isCurrentWeek,
              Volunteer_AllActivity,
              this.pageIndex,
              this.pageSize
          );
          this.service.getTodo(parms)
            .subscribe(value => {
              $this.todoItems = value.data;
              $this.pageIndex = value.pageIndex;
              $this.pageTotalCount = value.totalItemsCount;
            });
        }
      });
  }

}
