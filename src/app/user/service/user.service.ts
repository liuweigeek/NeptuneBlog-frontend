import { Injectable } from '@angular/core';
import { ServerResponse, Tweet, User } from '../../shared/entity';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    getUserInfo(userId: string): Observable<ServerResponse<User>> {
        return this.http.get<ServerResponse<User[]>>(
            `${environment.baseUrl}/user/user/getUserInfo/${userId}`
        ).pipe(
            map(result => Object.assign(new ServerResponse<User>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return of(ServerResponse.createByErrorMsg('获取用户信息失败'));
            })
        );
    }

    getByUsername(username: string): Observable<ServerResponse<User>> {
        return this.http.get<ServerResponse<Tweet[]>>(
            `${environment.baseUrl}/user/user/getByUsername/${username}`
        ).pipe(
            map(result => Object.assign(new ServerResponse<User>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return of(ServerResponse.createByErrorMsg('获取用户信息失败'));
            })
        );
    }
}
