import { Injectable } from '@angular/core';
import { Post, ServerResponse } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../../shared/entity/pageable';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    getPostsByUserId(authorId: string, pageable: Pageable<any>): Observable<ServerResponse<Pageable<Post>>> {
        return this.http.get<ServerResponse<Post[]>>(
            `${environment.baseUrl}/post/post/getPostsByUserId`,
            {
                params: {
                    authorId,
                    current: String(pageable.current),
                    size: String(pageable.size)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<Post>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return this.handleError();
            })
        );
    }

    getFollowingPost(pageable: Pageable<any>): Observable<ServerResponse<Pageable<Post>>> {
        return this.http.get<ServerResponse<Post[]>>(
            `${environment.baseUrl}/post/post/getFollowingPosts`,
            {
                params: {
                    current: String(pageable.current),
                    size: String(pageable.size)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Pageable<Post>>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return this.handleError();
            })
        );
    }

    private handleError() {
        return of(ServerResponse.createByErrorMsg('获取推文失败'));
    }
}
