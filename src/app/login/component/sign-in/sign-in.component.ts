import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { UserStoreService } from '../../../shared/service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private message: NzMessageService,
              private loginService: LoginService,
              private userStoreService: UserStoreService) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    this.loginService.login(this.validateForm.controls.email.value, this.validateForm.controls.password.value)
      .subscribe(res => {
        if (res.isSuccess()) {
          this.userStoreService.setLoginUser(res.data);
          this.router.navigate(['/']);
        } else {
          this.message.error(res.msg);
        }
      });
  }

}
