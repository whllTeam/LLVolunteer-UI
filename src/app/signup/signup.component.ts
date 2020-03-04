import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { SignupService } from '../Services/signup.service';
import { debounceTime, map, switchMap, first } from 'rxjs/operators';
import { checkPwdValidator } from '../Validator/passwordValidators';
import { UserRegister } from '../Model/signup/userRegister';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  validateForm: FormGroup;
  passwordVisible = false;
  isClickSubmit = false;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private signupService: SignupService,
    private router: Router
    ) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required], [this.checkHasUserNameAsync.bind(this)]],
      email: [ null, [Validators.email, Validators.required]],
      passwordGroup: this.fb.group({
        password: [ null, [ Validators.required, checkPwdValidator] ],
        confirmPwd: [ null, [Validators.required, checkPwdValidator]]
      }, { validator: this.equalValidator})
    });
  }

  submitForm(): void {
    this.isClickSubmit = true;
    this.validateForm.updateValueAndValidity();
    if ( this.validateForm.valid) {
      // 验证  成功
      console.log('valid');
      let formUser = this.validateForm.value;
      let user = new UserRegister(
        formUser.userName,
        formUser.email,
        formUser.passwordGroup.password,
        formUser.passwordGroup.confirmPwd
      );
      let $this = this;
      this.signupService.addUser(user)
        .subscribe(value => {
          if (value.succeeded === true) {
            $this.message.success('注册成功!');
            $this.clearControlValue();
            $this.router.navigate(['/volunteer']);
          } else {
            let errors: any[] = value.errors;
            let errorMessage = errors.reduce( (p, c) => {
              return p + c.description;
            }, '');
            $this.message.error(errorMessage);
            $this.clearControlValue();
          }
        }, error => {
          $this.message.error(error.message);
          $this.clearControlValue();
        });
    } else {
      // 验证 失败
      return ;
    }
  }

  equalValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password') as FormControl;
    const confirmPwd = control.get('confirmPwd') as FormControl;

    const isEqual = password.value === confirmPwd.value;

    return isEqual ? null : { password: {info: '两次密码不一致'}};
  }

  checkHasUserNameAsync(control: FormControl): any {
    let $this = this;
    return control.valueChanges
      .pipe(
         debounceTime(400),
        switchMap( () => $this.signupService.checkHasUserName(control.value)),
        map(value =>  value === false ? null : { userName: { info: '用户名重复'}}),
        first()
      );
  }

  validateStates(name:  string, fromGroupName = '') {
    let control: FormControl;
    if (fromGroupName === '') {
      control = this.validateForm.get(name) as FormControl;
    } else {
      control = this.validateForm.get(fromGroupName).get(name) as FormControl;
    }
    if ( control) {
      let valid = control.valid && (name === 'confirmPwd' ? this.validateForm.get(fromGroupName).valid : true);
      let dirty = control.dirty;
      return control.pending ? 'validating' : (dirty ?  (valid ? 'success' : 'error') : '');
    }
  }
  clearControlValue () {
    this.validateForm.reset();
  }
}
