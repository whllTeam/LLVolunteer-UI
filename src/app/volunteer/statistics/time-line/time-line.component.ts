import { Component, OnInit, Input } from '@angular/core';
import { SignActivityNotes } from '../../Model/Common/signActivityNotes';
import { StatisticsService } from '../Services/statistics.service';
import { Sign_sign, Sign_cancel, Volunteer_Dormitory, Volunteer_Office, Volunteer_OtherActivity } from '../../Model/ConstValue/const';
import { IdentityService } from 'src/app/oidc/Service/identity.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.css']
})
export class TimeLineComponent implements OnInit {

  userName: string;
  signActivityNotes: SignActivityNotes[];
  constructor(
    private statisticsService: StatisticsService,
    private oidc: IdentityService
  ) { }

  ngOnInit() {
    let $this = this;
    this.oidc.isLoggedInObs()
      .subscribe(load => {
        if (load) {
          this.userName = this.oidc.user.profile['name'];
          this.statisticsService.getSignActivityNotes(this.userName)
            .subscribe(value => {
              $this.signActivityNotes = value;
            });
        }
      });
  }

  getSignNotes(notes: SignActivityNotes): string {
    let str = '';
    if (notes.type === Volunteer_Dormitory) {
      str = `${str}寝室楼`;
    } else if (notes.type === Volunteer_Office) {
      str = `${str}办公室`;
    } else if (notes.type === Volunteer_OtherActivity) {
      str = `${str}${notes.organizationName}`;
    }
    return str;
  }
}
