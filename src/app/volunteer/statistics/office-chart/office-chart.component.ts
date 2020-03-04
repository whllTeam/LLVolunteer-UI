import { Component, OnInit, Input } from '@angular/core';
import { VolunteerCount } from '../../Model/Common/volunteerCount';
import { StatisticsService } from '../Services/statistics.service';
import { SignQuery } from '../../Model/Common/volunteerSignQuery';
import { Sign_query } from '../../Model/ConstValue/const';
import { IdentityService } from 'src/app/oidc/Service/identity.service';

@Component({
  selector: 'app-office-chart',
  templateUrl: './office-chart.component.html',
  styleUrls: ['./office-chart.component.css']
})
export class OfficeChartComponent implements OnInit {

  userName: string;
  volunteerCounts: VolunteerCount[];
  constructor(
    private statisticsService: StatisticsService,
    private oidc: IdentityService
  ) { }

  ngOnInit() {
    this.oidc.isLoggedInObs()
      .subscribe(load => {
        if (load) {
          this.userName = this.oidc.user.profile['name'];
          let query = new SignQuery(this.userName, '', '', Sign_query, -1, -1, -1);
          let $this = this;
          this.statisticsService.getOfficeSignCount(query)
            .subscribe(value => {
              $this.volunteerCounts = value;
            });
        }
      });
  }
}
