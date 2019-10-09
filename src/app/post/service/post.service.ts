import { Injectable } from '@angular/core';
import { Post, ServerResponse, User } from '../../shared/entity';
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
            timeout(30000),
            catchError(e => {
                return this.handleError();
            })
        );
    }

    private handleError() {
        return of(ServerResponse.createByErrorMsg('操作失败'));
    }
}
