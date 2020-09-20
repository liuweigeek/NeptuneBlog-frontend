import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../../shared/entity';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient) {
    }

    signIn(username: string, password: string): Observable<User> {
        return this.http.post<User>(
            `${environment.baseUrl}/auth-server/auth/signIn`, null,
            {
                params: {
                    username,
                    password
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    signUp(user: User): Observable<User> {
        return this.http.post<User>(
            `${environment.baseUrl}/auth-server/auth/signUp`, user
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }
}
