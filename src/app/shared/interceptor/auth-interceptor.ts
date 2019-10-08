import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthorityService } from '../service/authority.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly tokenKey = 'current_user';

    private readonly ignoreUrls: string[] = [
        '/user/user/login',
        '/user/user/register'
    ];

    constructor(private auth: AuthorityService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        for (const ignoreUrl of this.ignoreUrls) {
            if (req.url.endsWith(ignoreUrl)) {
                return next.handle(req);
            }
        }
        const authToken = this.auth.getAuthorizationToken();
        console.log('authToken', authToken);
        if (!authToken) {
            this.router.navigate(['/signIn']);
            return;
        }
        const authReq = req.clone({
            headers: req.headers.set(this.tokenKey, authToken)
        });
        return next.handle(authReq);
    }

}
