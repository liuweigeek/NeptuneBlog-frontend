import { Injectable } from '@angular/core';
import { User } from '../../shared/entity';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getByUserId(userId: number): Observable<User> {
        return this.http.get<User>(
            `${environment.baseUrl}/user-server/users/${userId}`
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    getByUsername(username: string): Observable<User> {
        return this.http.get<User>(
            `${environment.baseUrl}/user-server/users/username/${username}`
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }
}
