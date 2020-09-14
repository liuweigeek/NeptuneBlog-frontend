import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    private readonly authToken = 'token';

    constructor() {
    }

    getAuthorizationToken(): string {
        return localStorage.getItem(this.authToken);
    }

    setAuthorizationToken(token: string): void {
        localStorage.setItem(this.authToken, token);
    }
}
