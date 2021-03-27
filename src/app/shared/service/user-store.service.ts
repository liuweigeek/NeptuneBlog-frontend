import { Injectable } from '@angular/core';
import { User } from '../entity';
import { AuthorityService } from './authority.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {

    private authUser: User;

    private readonly userInfoKey = 'authUser';

    constructor(private authService: AuthorityService) {
    }

    getAuthUser(): User {
        if (!this.authUser) {
            const userInfoJson = localStorage.getItem(this.userInfoKey);
            if (userInfoJson) {
                this.authUser = JSON.parse(userInfoJson);
            }
        }
        return this.authUser;
    }

    setAuthUser(user: User) {
        this.authUser = user;
        localStorage.setItem(this.userInfoKey, JSON.stringify(user));
        if (user.token) {
            this.authService.setAuthorizationToken(user.token);
        }
    }

    clearAuthUser() {
        this.authUser = null;
        localStorage.removeItem(this.userInfoKey);
        this.authService.clearAuthorizationToken();
    }

}
