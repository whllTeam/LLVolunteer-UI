import { Component, OnInit } from '@angular/core';
import { DormitoryType } from '../../Model/Dormitory/dormitoryType';
import { DormitoryService } from '../../Service/dormitory.service';
import { IdentityService } from 'src/app/oidc/Service/identity.service';
import { SignData } from '../../Model/Common/signData';
import { SelfSignData } from '../../Model/Common/selfSignData';
import { jsonToMap } from '../../TestData/Common/commonFunction';
import { SignQuery } from '../../Model/Common/volunteerSignQuery';
import { Sign_query } from '../../Model/ConstValue/const';

@Component({
  selector: 'app-dormitory',
  templateUrl: './dormitory.component.html',
  styleUrls: ['./dormitory.component.css']
})
export class DormitoryComponent implements OnInit {

  dormitoryType: DormitoryType[];
  dormitorySignInfo: SignData[];
  dormitorySelfSignInfo: SelfSignData[];
  chooseTab = '';
  userName: string;
  constructor(
    private dormitoryService: DormitoryService,
    private oidc: IdentityService
  ) { }

  ngOnInit() {
    let $this = this;
    // 初始化  报名面板
    this.dormitoryService.getDormitoryType()
      .subscribe( value => {
        $this.dormitoryType = value ;
        const dormitory = $this.dormitoryType[0];
        $this.chooseTab = dormitory.name + this.confirmGender(dormitory.gender);
      });
      this.loadData();
  }

  tabSelect(name: string, gender: number) {
    this.chooseTab = name + this.confirmGender(gender);
  }
  confirmGender(gender: number) {
    return gender === 1 ? '(男寝)' : gender === 2 ? '(女寝)' : '(未知)' ;
  }
  getSignInfo(dormitoryTypeId: number): Map<string, number> {
    if (this.dormitorySignInfo && this.dormitorySignInfo.length !== 0) {
      let data = this.dormitorySignInfo.filter(t => t.key === dormitoryTypeId.toString());
      if (data && data.length > 0) {
        let str = JSON.stringify(data[0].data);
        return jsonToMap(str);
      }
    } else {
      return new Map<string, number>();
    }
  }
  getSelfSignInfo(dormitoryTypeId: string): SelfSignData[] {
    if ( this.dormitorySelfSignInfo && this.dormitorySelfSignInfo.length !== 0) {
      return this.dormitorySelfSignInfo.filter( t => t.volunteerId === parseFloat(dormitoryTypeId));
    } else {
      return [];
    }
  }
  loadData() {
    // 重新加载数据
     // 获取  用户信息
    let $this = this;
     this.oidc.isLoggedInObs()
     .subscribe(value => {
       if (value) {
         $this.userName = $this.oidc.user.profile['name'];
         let queryParm = new SignQuery($this.userName, '', '', Sign_query, 0, 0, 0);
         $this.dormitoryService.dormitoryGetSelfSign(queryParm)
           .subscribe( v => {
             $this.dormitorySelfSignInfo = v;
           });
       }
     });
   // 获取 寝室楼值班 信息
   let query = new SignQuery('', '', '', Sign_query, 0, 0, 0);
   $this.dormitoryService.getSignInfo(query)
     .subscribe(value => {
       $this.dormitorySignInfo = value;
     });
  }
}
