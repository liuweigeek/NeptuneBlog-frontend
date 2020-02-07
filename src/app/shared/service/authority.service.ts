import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    private readonly tokenKey = 'token';

    constructor() {
    }

    getAuthorizationToken(): string {
        return localStorage.getItem(this.tokenKey);
    }

    setAuthorizationToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
}
