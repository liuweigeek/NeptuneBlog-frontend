import { Injectable } from '@angular/core';
import { Pageable } from '../../shared/entity/pageable';
import { of } from 'rxjs';
import { ServerResponse, User } from '../../shared/entity';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FriendService {

    constructor(private http: HttpClient) {
    }

    getFollowingUsers(
        pageable: Pageable<any>,
        successCallback: (res: ServerResponse<Pageable<User>>) => void,
        failedCallback: (res: ServerResponse<Pageable<User>>) => void
    ) {
        return this.http.get<ServerResponse<User[]>>(
            `${environment.baseUrl}/user/friend/findFollowing`,
            {
                params: {
                    current: String(pageable.current),
                    size: String(pageable.size)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<User>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => this.handleError())
        ).subscribe(response => {
            response.isSuccess() ? successCallback(response) : failedCallback(response);
        });
    }

    private handleError() {
        return of(ServerResponse.createByErrorMsg('操作失败'));
    }
}
