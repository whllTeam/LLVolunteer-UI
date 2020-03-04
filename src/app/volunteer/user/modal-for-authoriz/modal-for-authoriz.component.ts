import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { of, Observable } from 'rxjs';
import { SchoolInfoService } from '../../Service/school-info.service';
import { HttpHeaders } from '@angular/common/http';
import { UserLogin } from '../../Model/schoolManager/userLogin';
import { UserInfoAuth } from '../../Model/schoolManager/userInfoAuth';

@Component({
  selector: 'app-modal-for-authoriz',
  templateUrl: './modal-for-authoriz.component.html',
  styleUrls: ['./modal-for-authoriz.component.css']
})
export class ModalForAuthorizComponent implements OnInit {

  @Input()
  userLoginName: string;

  userInfoAuth: UserInfoAuth;
  schoolInfoFormGroup: FormGroup;
  imageSrc: string;
  preUrl: string;
  loginUrl: string;
  loginViewState: string;
  authEvent: EventEmitter<boolean>;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private service: SchoolInfoService
  ) { }

  ngOnInit() {
    this.authEvent = new EventEmitter();
    this.schoolInfoFormGroup = this.fb.group({
      userId: [ null, [Validators.required]],
      password: [ null, [Validators.required]],
      validateCode: [ null, [Validators.required]]
    });
    this.loadImage();
  }
  loadImage() {
    const $this = this;
    this.service.getValidateCode()
      .subscribe( res => {
       $this.imageSrc = res.body;
       const header: HttpHeaders = res.headers;
       $this.preUrl = header.get('PreUrl');
       $this.loginUrl = header.get('LoginUrl');
       $this.loginViewState = header.get('LoginViewState');
       console.log(header);
      }, (e) => {
        console.log('网络异常');
      });
  }
  submitForm(): Observable<boolean> {
    const $this = this;
    if (this.schoolInfoFormGroup.valid) {
      const formValue =   this.schoolInfoFormGroup.value;
      const query: UserLogin = new UserLogin(
        formValue.userId,
        formValue.password,
        formValue.validateCode,
        $this.preUrl,
        $this.loginUrl,
        $this.loginViewState,
        $this.userLoginName
      );
      $this.service.authorizeUserInfo(query)
        .subscribe( res => {
          console.log(res);
          if ( res.success === true) {
            $this.userInfoAuth = res.data;
            $this.authEvent.emit(true);
          } else {
            this.message.create('error', res.message);
            $this.authEvent.emit(false);
          }
        });
        return $this.authEvent;
    } else {
      this.message.create('error', '请按照要求填写');
      return of(false);
    }
  }

}
