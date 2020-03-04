import { FormControl, ValidationErrors } from '@angular/forms';
import { Inject } from '@angular/core';

export function checkPwdValidator(group: FormControl): ValidationErrors | null {
  const pwdReg = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,16}/;
  const result = pwdReg.test(group.value);
  return result ? null : { pwd: { info: '密码不符合规范'}};
}
