import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Const, User, UserStoreService } from '../../../shared';
import { AuthenticationService } from '../../service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

    validateForm: FormGroup;
    signInRoute = Const.signInRoute;

    constructor(private fb: FormBuilder,
                private router: Router,
                private message: NzMessageService,
                private authenticationService: AuthenticationService,
                private userStoreService: UserStoreService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            username: [null, [Validators.required]],
            name: [null, [Validators.required]],
            birthday: [null, [Validators.required]],
            gender: [null, [Validators.required]],
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

        this.authenticationService.signUp(this.getUserFromForm())
            .subscribe(next => {
                this.userStoreService.setAuthUser(next);
                this.router.navigate(['auth', 'addInfo']);
            }, error => {
                this.message.error(error.error.message || '注册失败');
            });
    }

    getUserFromForm(): User {
        return {
            email: this.validateForm.controls.email.value,
            username: this.validateForm.controls.username.value,
            name: this.validateForm.controls.name.value,
            birthday: this.validateForm.controls.birthday.value,
            gender: this.validateForm.controls.gender.value,
            password: this.validateForm.controls.password.value
        } as User;
    }

    updateConfirmValidator(): void {
        // wait for refresh value
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
