import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { AuthorityService } from './authority.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private loginUser: User;

    private readonly userInfoKey = 'loginUser';

    constructor(private authService: AuthorityService) {
    }

    getLoginUser(): User {
        if (!this.loginUser) {
            const userInfoJson = localStorage.getItem(this.userInfoKey);
            if (userInfoJson) {
                this.loginUser = JSON.parse(userInfoJson);
            }
        }
        return this.loginUser;
    }

    setLoginUser(user: User) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(user));
        this.authService.setAuthorizationToken(user.token);
    }

}
