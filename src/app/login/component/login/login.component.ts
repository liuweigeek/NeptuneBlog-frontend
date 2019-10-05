import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../shared/entity/user';
import { UserStoreService } from '../../../shared/service/user-store.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private isLoginMode = true;

    constructor(
        private router: Router,
        private userStoreService: UserStoreService) {
    }

    ngOnInit(): void {
        this.isLoginMode = !this.router.url.endsWith('signUp');
    }

    handleSignInSuccess(user: User) {
        this.userStoreService.loginUser = user;
        this.router.navigate(['home']);
    }

    handleSignUpSuccess(user: User) {
        this.userStoreService.loginUser = user;
        this.router.navigate(['home']);
    }

}
