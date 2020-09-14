import { Injectable } from '@angular/core';
import { Pageable, PageRequest, ServerResponse, Tweet } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TweetService {

    constructor(private http: HttpClient) {
    }

    publishTweet(tweet: Tweet): Observable<ServerResponse<Tweet>> {
        return this.http.post<ServerResponse<Tweet>>(
            `${environment.baseUrl}/post/post/sendPost`,
            tweet
        ).pipe(
            map(result => Object.assign(new ServerResponse(), result)),
            timeout(environment.httpTimeout),
            catchError(() =>
                of(ServerResponse.createByErrorMsg('发送失败'))
            )
        );
    }

    getTweetsByUserId(authorId: string, pageRequest: PageRequest): Observable<ServerResponse<Pageable<Tweet>>> {
        return this.http.get<ServerResponse<Tweet[]>>(
            `${environment.baseUrl}/post/post/getPostsByUserId`,
            {
                params: {
                    authorId,
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<Tweet>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return of(ServerResponse.createByErrorMsg('获取推文失败'));
            })
        );
    }

    getTweetsByUsername(username: string, pageRequest: PageRequest): Observable<ServerResponse<Pageable<Tweet>>> {
        return this.http.get<ServerResponse<Tweet[]>>(
            `${environment.baseUrl}/post/post/getPostsByUsername`,
            {
                params: {
                    username,
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<Tweet>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return of(ServerResponse.createByErrorMsg('获取推文失败'));
            })
        );
    }

    getFollowingTweet(pageRequest: PageRequest): Observable<Pageable<Tweet>> {
        return this.http.get<Pageable<Tweet>>(
            `${environment.baseUrl}/tweet-server/tweets/following`,
            {
                params: {
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        );
    }
}
