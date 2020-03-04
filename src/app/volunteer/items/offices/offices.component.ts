import { Component, OnInit } from '@angular/core';
import { OfficeType } from '../../Model/Office/officeType';
import { OfficeService } from '../../Service/office.service';
import { IdentityService } from 'src/app/oidc/Service/identity.service';
import { SignData } from '../../Model/Common/signData';
import { SelfSignData } from '../../Model/Common/selfSignData';
import { SignQuery } from '../../Model/Common/volunteerSignQuery';
import { jsonToMap } from '../../TestData/Common/commonFunction';
import { Sign_query } from '../../Model/ConstValue/const';

@Component({
  selector: 'app-offices',
  templateUrl: './offices.component.html',
  styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

  officeType: OfficeType[];
  officeSignInfo: SignData[];
  officeSelfSignInfo: SelfSignData[];
  chooseTab = '';
  userName: string;

  constructor(
    private oidc: IdentityService,
    private officeService: OfficeService
    ) { }

  ngOnInit() {
    let $this = this;
    // 初始化  报名面板
    this.officeService.getOfficeType()
      .subscribe( value => {
        $this.officeType = value ;
        const dormitory = $this.officeType[0];
        $this.chooseTab = dormitory.name;
      });
      $this.loadData();
    }

  tabSelect(name: string) {
    this.chooseTab = name;
  }

  getSignInfo(officeTypeId: number): Map<string, number> {
    if (this.officeSignInfo && this.officeSignInfo.length !== 0) {
      let data = this.officeSignInfo.filter(t => t.key === officeTypeId.toString());
      if (data && data.length > 0) {
        let str = JSON.stringify(data[0].data);
        return jsonToMap(str);
      }
    } else {
      return new Map<string, number>();
    }
  }
  getSelfSignInfo(dormitoryTypeId: string): SelfSignData[] {
    if ( this.officeSelfSignInfo && this.officeSelfSignInfo.length !== 0) {
      return this.officeSelfSignInfo.filter( t => t.volunteerId === parseFloat(dormitoryTypeId));
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
         $this.officeService.officeGetSelfSign(queryParm)
           .subscribe( v => {
             $this.officeSelfSignInfo = v;
           });
       }
     });
   // 获取 办公室值班 信息
   let query = new SignQuery('', '', '', Sign_query, 0, 0, 0);
   $this.officeService.getSignInfo(query)
     .subscribe(value => {
       $this.officeSignInfo = value;
     });
  }
}
