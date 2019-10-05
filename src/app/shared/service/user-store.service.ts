import { Injectable } from '@angular/core';
import { User } from '../entity/user';
import { AuthorityService } from './authority.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private _loginUser: User;

    private readonly userInfoKey = 'loginUser';

    constructor(private authService: AuthorityService) {
    }

    get loginUser(): User {
        if (!this._loginUser) {
            const userInfoJson = localStorage.getItem(this.userInfoKey);
            if (userInfoJson) {
                this._loginUser = JSON.parse(userInfoJson);
            }
        }
        return this._loginUser;
    }

    set loginUser(user: User) {
        localStorage.setItem(this.userInfoKey, JSON.stringify(user));
        this.authService.setAuthorizationToken(user.token);
    }

}
