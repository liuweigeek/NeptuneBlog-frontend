import { Injectable } from '@angular/core';
import { Pageable, PageRequest, Tweet } from '../../shared';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TweetService {

    constructor(private http: HttpClient) {
    }

    publishTweet(tweet: Tweet): Observable<Tweet> {
        return this.http.post<Tweet>(
            `${environment.baseUrl}/tweet-server/tweets`,
            tweet
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    findTweetsByUserId(authorId: number, pageRequest: PageRequest): Observable<Pageable<Tweet>> {
        return this.http.get<Pageable<Tweet>>(
            `${environment.baseUrl}/tweet-server/tweets/user/${authorId}`,
            {
                params: {
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }

    findFollowingTweet(pageRequest: PageRequest): Observable<Pageable<Tweet>> {
        return this.http.get<Pageable<Tweet>>(
            `${environment.baseUrl}/tweet-server/tweets/following`,
            {
                params: {
                    offset: String(pageRequest.offset),
                    limit: String(pageRequest.limit)
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }
}
