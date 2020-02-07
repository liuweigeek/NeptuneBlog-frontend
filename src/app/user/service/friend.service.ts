import { Injectable } from '@angular/core';
import { Pageable, ServerResponse, User } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FriendService {

    constructor(private http: HttpClient) {
    }

    /**
     * 获取正在关注的用户
     * @param username          用户名
     * @param pageable          分页
     * @param successCallback   获取成功回调
     * @param failedCallback    获取失败回调
     */
    getFollowingUsers(
        username: string,
        pageable: Pageable<any>,
        successCallback: (res: ServerResponse<Pageable<User>>) => void,
        failedCallback: (res: ServerResponse<Pageable<User>>) => void
    ) {
        return this.http.get<ServerResponse<User[]>>(
            `${environment.baseUrl}/user/friend/findFollowing`,
            {
                params: {
                    username,
                    current: String(pageable.current),
                    size: String(pageable.size)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<User>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => of(ServerResponse.createByErrorMsg('获取关注人失败')))
        ).subscribe(res => {
            res.isSuccess() ? successCallback(res) : failedCallback(res);
        });
    }

    /**
     * 获取关注者
     * @param username          用户名
     * @param pageable          分页
     * @param successCallback   获取成功回调
     * @param failedCallback    获取失败回调
     */
    getFollowerUsers(
        username: string,
        pageable: Pageable<any>,
        successCallback: (res: ServerResponse<Pageable<User>>) => void,
        failedCallback: (res: ServerResponse<Pageable<User>>) => void
    ) {
        return this.http.get<ServerResponse<User[]>>(
            `${environment.baseUrl}/user/friend/findFollower`,
            {
                params: {
                    username,
                    current: String(pageable.current),
                    size: String(pageable.size)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<User>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => of(ServerResponse.createByErrorMsg('获取关注者失败')))
        ).subscribe(res => {
            res.isSuccess() ? successCallback(res) : failedCallback(res);
        });
    }

    /**
     * 关注用户
     * @param userId    用户ID
     */
    follow(userId: string): Observable<ServerResponse<any>> {
        return this.http.post<ServerResponse<any>>(
            `${environment.baseUrl}/user/friend/follow`,
            userId
        ).pipe(
            map(result => Object.assign(new ServerResponse(), result)),
            timeout(environment.httpTimeout),
            catchError(() =>
                of(ServerResponse.createByErrorMsg('关注失败'))
            )
        );
    }

    /**
     * 取消关注
     * @param userId    用户ID
     */
    cancelFollow(userId: string): Observable<ServerResponse<any>> {
        return this.http.delete<ServerResponse<any>>(
            `${environment.baseUrl}/user/friend/cancelFollow/${userId}`
        ).pipe(
            map(result => Object.assign(new ServerResponse(), result)),
            timeout(environment.httpTimeout),
            catchError(() =>
                of(ServerResponse.createByErrorMsg('取消关注失败'))
            )
        );
    }
}
