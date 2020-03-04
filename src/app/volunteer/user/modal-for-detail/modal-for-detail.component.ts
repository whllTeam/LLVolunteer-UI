import { Component, OnInit, Input } from '@angular/core';
import { SchoolUserInfo } from '../../Model/schoolManager/schoolUserInfo';
import { SchoolUserService } from '../../Service/school-user.service';
import { SchoolUserInfoDetailInfo } from '../../Model/schoolManager/schoolUserDetailInfo';
import { SchoolInfoService } from '../../Service/school-info.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-modal-for-detail',
  templateUrl: './modal-for-detail.component.html',
  styleUrls: ['./modal-for-detail.component.css']
})
export class ModalForDetailComponent implements OnInit {

  @Input()
  userSchoolInfo: SchoolUserInfo;

  isSpinning: boolean;
  userDetailInfo: SchoolUserInfoDetailInfo;
  constructor(
    private message: NzMessageService,
    private service: SchoolInfoService
  ) { }

  ngOnInit() {
    this.isSpinning = true;
    this.loadInfo();
  }
  loadInfo() {
    if (this.userSchoolInfo) {
      this.service.getSchoolUserInfo(this.userSchoolInfo.userId, this.userSchoolInfo.userName)
        .subscribe( value => {
          if (value.success) {
            this.isSpinning = false;
            this.userDetailInfo = value.data;
          } else {
            this.message.create('error', value.message);
          }
        });
    }
  }
}
