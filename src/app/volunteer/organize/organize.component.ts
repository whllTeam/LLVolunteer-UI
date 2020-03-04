import { Component, OnInit, ViewChild } from '@angular/core';
import { OrganzieService } from '../Service/organzie.service';
import { OrganizationInfo } from '../Model/Organizations/organizationInfo';
import { environment } from 'src/environments/environment';
import { ActivityForOrganization } from '../Model/Organizations/activityForOrganization';
import { NotifyMessageComponent } from '../notify-message/notify-message.component';
import { ActivityState_Closed, ActivityState_WillStart, Sign_query, Sign_cancel, Sign_sign } from '../Model/ConstValue/const';
import { IdentityService } from 'src/app/oidc/Service/identity.service';
import { SignQuery } from '../Model/Common/volunteerSignQuery';
import { ActivityService } from '../Service/activity.service';
import { ActivitySelfSignData } from '../Model/Organizations/activitySelfSignData';
import { ActivitySignData } from '../activity/activitySignData';
@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.css']
})
export class OrganizeComponent implements OnInit {

  @ViewChild('notifyMessage')
  notifiyMessage: NotifyMessageComponent;

  userName: string;
  fileServer = environment.apis.fileUrl;
  organizInfo: OrganizationInfo[];
  activitySelfSign: ActivitySelfSignData[];
  activitySignInfo: ActivitySignData[];
  constructor(
    private service: OrganzieService,
    private oidc: IdentityService,
    private activityService: ActivityService
  ) { }

  ngOnInit() {
    // 志愿组织信息
    this.service.getOrganization()
      .subscribe(value => {
        this.organizInfo = value;
      });
    this.loadSignInfo();
    this.loadData();
  }
  loadSignInfo() {
    // 志愿活动 报名人数信息
    const query = new SignQuery('', '', '', Sign_query, 0, 0, 0);
    this.activityService.getActivitySignInfo(query)
      .subscribe(value => {
        this.activitySignInfo = value;
      });
  }
  loadData() {
    let $this = this;
    // 志愿活动 当前 用户  报名信息
    this.oidc.isLoggedInObs()
      .subscribe(value => {
        if (value) {
          $this.userName = $this.oidc.user.profile['name'];
          let queryParm = new SignQuery($this.userName, '', '', Sign_query, 0, 0, 0);
          $this.activityService.getSignInfoSelf(queryParm)
            .subscribe(v => {
              $this.activitySelfSign = v;
            });
        }
      });
  }

  getImageSrc(path: string) {
    return `${this.fileServer}/${path}`;
  }
  getCardDes(card: ActivityForOrganization) {
    return `${card.activityDes}\n活动进行时间:${card.startTime}-${card.endTime}`;
  }
  checkHasSign(activity: ActivityForOrganization): boolean {
    if (this.activitySelfSign) {
      return this.activitySelfSign.filter(t =>
        t.activityId === activity.id
        && t.organizationId === activity.organizationInfoId).length > 0;
    } else {
      return false;
    }
  }
  getActivityCount(activity: ActivityForOrganization) {
    if (this.activitySignInfo) {
      const signInfo = this.activitySignInfo.filter(t => t.activityId === activity.id && t.organizationId === activity.organizationInfoId);
      return signInfo.length > 0 ? signInfo[0].signCount : 0;
    } else {
      return 0;
    }
  }
  signActivityHandel(activity: ActivityForOrganization) {
    const $this = this;
    if (activity.canSignActivity === true) {
      // 检查是否登陆
      this.oidc.isLoggedInObs()
        .subscribe(value => {
          if (value) {
            $this.userName = $this.oidc.user.profile['name'];
            const signType = this.checkHasSign(activity) ? Sign_cancel : Sign_sign;
            let queryParm = new SignQuery($this.userName, '', '', signType, 0, 0, activity.id);
            if (signType === Sign_cancel) {
              $this.notifiyMessage.showConfirm('确认要取消报名吗？', () => {
                $this.activityService.activitySign(queryParm)
                  .subscribe(v => {
                    if (v === true) {
                      $this.notifiyMessage.showMessage('info', '取消报名成功');
                    } else {
                      $this.notifiyMessage.showMessage('info', '取消报名失败');
                    }
                    this.loadData();
                    this.loadSignInfo();
                  });
              });
            } else {
              // 报名
              $this.activityService.activitySign(queryParm)
                .subscribe(v => {
                  if (v === true) {
                    $this.notifiyMessage.showMessage('info', '报名成功');
                  } else {
                    $this.notifiyMessage.showMessage('info', '报名失败');
                  }
                  this.loadData();
                  this.loadSignInfo();
                });
            }
          } else {
            // 未登陆状态
            $this.oidc.triggerSignIn();
          }
        }
        );
    } else {
      if (activity.activityState === ActivityState_Closed) {
        this.notifiyMessage.showMessage('info', '活动已关闭');
      } else if (activity.activityState === ActivityState_WillStart) {
        this.notifiyMessage.showMessage('info', '活动暂未开启');
      }
    }
  }
  parseToDate(value: string) {
    return  (new Date(value));
  }
}
