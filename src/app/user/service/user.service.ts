import { Injectable } from '@angular/core';
import { Post, ServerResponse, User } from '../../shared/entity';
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
        return this.http.get<ServerResponse<Post[]>>(
            `${environment.baseUrl}/user/user/getUserInfo/${userId}`
        ).pipe(
            map(result => Object.assign(new ServerResponse<User>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return this.handleError();
            })
        );
    }

    private handleError() {
        return of(ServerResponse.createByErrorMsg('操作失败'));
    }
}