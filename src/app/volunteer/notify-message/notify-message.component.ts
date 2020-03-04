import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzNotificationService, NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notify-message',
  templateUrl: './notify-message.component.html',
  styleUrls: ['./notify-message.component.css']
})
export class NotifyMessageComponent implements OnInit {

  @ViewChild('templateNotify')
  private tp1: TemplateRef<any>;

  confirmModal: NzModalRef;
  private messageType = '';
  content = '';
  title = 'info';
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalService
  ) { }

  ngOnInit() {
  }

  /**
   *
   *
   * @param {string} messageType 'error' 'info' 'success'
   * @param {string} content
   * @param {string} [title='温馨提示']
   * @memberof NotifyMessageComponent
   */
  showMessage(messageType: string, content: string, title = '温馨提示') {
    this.messageType = messageType;
    this.content = content;
    this.title = title;
    this.notification.template(this.tp1, {
      nzDuration: 1000
    });
  }

  showConfirm(content: string, onOk: () => void, title = '温馨提示') {
    this.confirmModal = this.modal.confirm({
      nzTitle: title,
      nzContent: content,
      nzOnOk: () => {
        onOk();
      }
    });
  }
  getIco(type: string): boolean {
    if (this.messageType === type) {
      return true;
    } else {
      return false;
    }
  }
}
