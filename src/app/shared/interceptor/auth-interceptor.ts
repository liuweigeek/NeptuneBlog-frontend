import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthorityService } from '../service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Const } from '../constant/const';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly authHeader = 'authorization';

    private readonly ignoreUrls: string[] = [
        '/auth-server/auth/signIn',
        '/auth-server/auth/signUp'
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
        if (!authToken) {
            this.router.navigate([Const.signInRoute]);
            return;
        }
        const authReq = req.clone({
            headers: req.headers.set(this.authHeader, authToken)
        });
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status && error.status === 401) {
                    this.router.navigate([Const.signInRoute]);
                    return;
                }
                return throwError(error);
            }));
    }
}
