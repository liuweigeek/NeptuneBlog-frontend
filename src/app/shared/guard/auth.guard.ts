import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorityService, UserStoreService } from '../service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    signInRoute = '/authentication/signIn';

    constructor(private router: Router,
                private authService: AuthorityService,
                private userStoreService: UserStoreService) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.getAuthorizationToken()) {
            this.navigateToSignUp();
            return false;
        }
        if (!this.userStoreService.getLoginUser()) {
            this.navigateToSignUp();
            return false;
        }
        return true;
    }

    navigateToSignUp() {
        this.router.navigate([this.signInRoute]);
    }
}
