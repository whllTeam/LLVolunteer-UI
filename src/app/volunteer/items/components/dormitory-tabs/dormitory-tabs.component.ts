import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DormitoryWeek } from 'src/app/volunteer/Model/Dormitory/dormitoryWeek';
import { DormitoryTime } from 'src/app/volunteer/Model/Dormitory/dormitoryTime';
import { DormitoryService } from 'src/app/volunteer/Service/dormitory.service';
import { SelfSignData } from 'src/app/volunteer/Model/Common/selfSignData';
import { SignQuery } from 'src/app/volunteer/Model/Common/volunteerSignQuery';
import { Sign_sign, Sign_cancel } from 'src/app/volunteer/Model/ConstValue/const';
import { NotifyMessageComponent } from 'src/app/volunteer/notify-message/notify-message.component';

@Component({
  selector: 'app-dormitory-tabs',
  templateUrl: './dormitory-tabs.component.html',
  styleUrls: ['./dormitory-tabs.component.css']
})
export class DormitoryTabsComponent implements OnInit {

  @ViewChild('notifyMessage')
  notiyfMessage: NotifyMessageComponent;
  @Input()
  dormitoryTypeId: number;
  @Input()
  dormitorySignInfo: Map<string, number>;
  @Input()
  userName: string;
  @Input()
  signData: SelfSignData[];
  @Output()
  loadData = new EventEmitter<string>();
  // 周 信息
  dormitoryWeek: DormitoryWeek[];
  // 时间段 信息
  dormitoryTime: DormitoryTime[];

  constructor(
    private dormitoryService: DormitoryService
  ) { }

  ngOnInit() {
    this.dormitoryService.getDormitoryTime()
      .subscribe(value => {
        this.dormitoryTime = value;
      });
    this.dormitoryService.getDormitoryWeek()
      .subscribe(value => {
        this.dormitoryWeek = value;
      });
  }

  signHandle(weekId: number, timeId: number) {
    let $this = this;
    if (this.checkSign(weekId, timeId)) {
          // 取消 报名  请求
          $this.notiyfMessage.showConfirm('确认要取消报名吗?', () => {
            let query = new SignQuery(this.userName, '', '', Sign_cancel, weekId, timeId, this.dormitoryTypeId);
            this.dormitoryService.dormitorySign(query)
              .subscribe(value => {
                if (value === true ) {
                  $this.loadData.emit('load');
                  $this.notiyfMessage.showMessage(
                    'success', '取消报名成功'
                  );
                } else if (value === false) {
                  $this.notiyfMessage.showMessage(
                    'error', '取消报名失败'
                  );
                } else {
                  $this.notiyfMessage.showMessage(
                    'error', '系统繁忙,稍后再试'
                  );
                }
              });
          });
        } else {
      // 报名
      let query = new SignQuery(this.userName, '', '', Sign_sign, weekId, timeId, this.dormitoryTypeId);
      this.dormitoryService.dormitorySign(query)
          .subscribe( value => {
            if (value === true) {
              $this.loadData.emit('load');
              $this.notiyfMessage.showMessage(
                'success', '报名成功'
              );
            } else if (value === false) {
              $this.notiyfMessage.showMessage(
                'error', '报名失败'
              );
            } else {
              $this.notiyfMessage.showMessage(
                'error', '系统繁忙,稍后再试'
              );
            }
          });
    }
  }


  /**
   *
   *
   * @param {number} i
   * @param {number} j
   * @returns {number}
   * @memberof TablesComponent
   */
  getSignData(i: number, j: number): number {
    if ( this.dormitorySignInfo) {
      return this.dormitorySignInfo.get(`${i},${j}`) === undefined ? 0 : this.dormitorySignInfo.get(`${i},${j}`);
    } else {
      return 0;
    }
  }
  setSignData(i: number, j: number, type: number = 0) {
    let num = this.getSignData(i, j);
    num = num + type;
    this.dormitorySignInfo.set(`${i},${j}`, num);
  }
  /**
   *是否已报名
   *
   * @param {number} weekId
   * @param {number} classId
   * @returns {boolean}
   * @memberof TablesComponent
   */
  checkSign(weekId: number, weekTimeId: number):  boolean {
     const sign = this.signData.filter(value => {
       return value.weekId === weekId && value.timeId === weekTimeId ;
     });
     return sign.length > 0;
  }
  checkEnable(weekTimeId: number, isDontAllow: string) {
    return isDontAllow.indexOf(weekTimeId.toString()) <= -1;
  }
}
