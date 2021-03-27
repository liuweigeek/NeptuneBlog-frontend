import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorityService, UserStoreService } from '../service';
import { Const } from '../constant/const';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private authService: AuthorityService,
                private userStoreService: UserStoreService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.getAuthorizationToken()) {
            this.navigateToSignIn();
            return false;
        }
        if (!this.userStoreService.getAuthUser()) {
            this.navigateToSignIn();
            return false;
        }
        return true;
    }

    navigateToSignIn() {
        this.router.navigate([Const.signInRoute]);
    }
}
