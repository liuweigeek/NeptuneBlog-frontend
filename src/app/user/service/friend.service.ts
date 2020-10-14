import { Injectable } from '@angular/core';
import { Pageable, PageRequest, User } from '../../shared/entity';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Friendship } from '../../shared/entity/friendship';

@Injectable({
    providedIn: 'root'
})
export class FriendService {

    constructor(private http: HttpClient) {
    }

    /**
     * 获取正在关注的用户
     * @param username      用户名
     * @param pageRequest   分页参数
     */
    getFollowingUsers(
        username: string,
        pageRequest: PageRequest
    ): Observable<Pageable<Friendship>> {
        return this.http.get<Pageable<Friendship>>(
            `${environment.baseUrl}/user-server/following`,
            {
                params: {
                    username,
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    /**
     * 获取关注者
     * @param username      用户名
     * @param pageRequest   分页
     */
    getFollowerUsers(
        username: string,
        pageRequest: PageRequest
    ): Observable<Pageable<Friendship>> {
        return this.http.get<Pageable<Friendship>>(
            `${environment.baseUrl}/user-server/followers`,
            {
                params: {
                    username,
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    /**
     * 关注用户
     * @param userId    用户ID
     */
    follow(userId: number): Observable<User> {
        return this.http.post<User>(
            `${environment.baseUrl}/user-server/friendships`, null,
            {
                params: {
                    userId: userId.toString()
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    /**
     * 取消关注
     * @param userId    用户ID
     */
    cancelFollow(userId: number): Observable<User> {
        return this.http.delete<User>(
            `${environment.baseUrl}/user-server/friendships/${userId}`
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }
}
