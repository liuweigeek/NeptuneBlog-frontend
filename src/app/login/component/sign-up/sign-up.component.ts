import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../shared/entity';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  validateForm: FormGroup;

  @Output() signUpSuccess = new EventEmitter<User>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      username: [null, [Validators.required]],
      nickname: [null, [Validators.required]],
      birthday: [null, [Validators.required]],
      sex: [null, [Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.loginService.register(this.getUserFromForm())
      .subscribe(res => {
        if (res.isSuccess()) {
          this.signUpSuccess.emit(res.data);
        } else {
          this.message.error(res.msg);
        }
      });
  }

  getUserFromForm(): User {
    return {
      email: this.validateForm.controls.email.value,
      username: this.validateForm.controls.username.value,
      nickname: this.validateForm.controls.nickname.value,
      birthday: this.validateForm.controls.birthday.value,
      sex: this.validateForm.controls.sex.value,
      password: this.validateForm.controls.password.value
    } as User;
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  };

}
