import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityService } from 'src/app/oidc/Service/identity.service';
import { ModalForAuthorizComponent } from './modal-for-authoriz/modal-for-authoriz.component';
import { NzModalService } from 'ng-zorro-antd';
import { NotifyMessageComponent } from '../notify-message/notify-message.component';
import { SchoolUserService } from '../Service/school-user.service';
import { ModalForDetailComponent } from './modal-for-detail/modal-for-detail.component';
import { SchoolUserInfo } from '../Model/schoolManager/schoolUserInfo';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @ViewChild('notifyMessage')
  notiyfMessage: NotifyMessageComponent;

  realName: string;
  name: string;
  isAuthoriz: boolean;
  schoolUserInfo: SchoolUserInfo;
  constructor(
    private oidc: IdentityService,
    private modalService: NzModalService,
    private userService: SchoolUserService
  ) { }

  ngOnInit() {
    let $this = this;
    this.oidc.isLoggedInObs()
      .subscribe(load => {
        if (load) {
          $this.name = $this.oidc.user.profile['name'];
          $this.userService.getUserInfoByName($this.name)
            .subscribe(value => {
              if (value) {
                // 包含有学生
                if (value.isAuthorize) {
                  $this.schoolUserInfo = value;
                  $this.realName = value.schoolUserName;
                  $this.isAuthoriz = true;
                }
              } else {
                // 未认证
                $this.realName = $this.name;
                $this.isAuthoriz = false;
              }
            });
        }
      });
  }

  AuthorizSchoolInfoModal() {
    let $this = this;
    this.oidc.isLoggedInObs()
      .subscribe(load => {
        if (load) {
          $this.name = $this.oidc.user.profile['name'];
          let loading = false;
          let isVisible = false;
          this.modalService.create({
            nzWidth: '800px',
            nzTitle: '身份认证',
            nzContent: ModalForAuthorizComponent,
            nzComponentParams: {
              userLoginName: $this.name
            },
            nzMaskClosable: false,
            nzVisible: isVisible,
            nzOkLoading: loading,
            nzOnOk: table => {
              loading = true;
              isVisible = true;
              return table.submitForm().subscribe(value => {
                loading = false;
                isVisible = value;
                if (value === true) {
                  $this.realName = table.userInfoAuth.realUserName;
                  $this.notiyfMessage.showMessage('info', '认证成功');
                } else {
                  $this.notiyfMessage.showMessage('info', '认证失败');
                }
                return value;
              });
            },
            nzOnCancel: table => {
              return true;
              // 下面 有bug
              // const quite = $this.notiyfMessage
              //   .showConfirm('确认要退出吗?', () => {
              //     $this.notiyfMessage.showMessage('info', '用户已取消');
              //   }, () => { });
            }
          });
        }
      });
  }
  AuthorizSchoolInfo() {
    if (this.isAuthoriz) {
      this.SchoolInfoDetailModal();
    } else {
      this.AuthorizSchoolInfoModal();
    }
  }
  SchoolInfoDetailModal() {
    let $this = this;
    this.modalService.create({
      nzWidth: '400px',
      nzTitle: '详细信息',
      nzContent: ModalForDetailComponent,
      nzComponentParams: {
        userSchoolInfo: $this.schoolUserInfo
      },
      nzMaskClosable: false,
      nzOnOk: table => {
        return true;
      }
    });
  }
}
