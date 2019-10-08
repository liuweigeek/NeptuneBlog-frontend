import { Injectable } from '@angular/core';
import { Post, ServerResponse, User } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(private http: HttpClient) {
    }

    getFollowingPost(pageNumber: number, pageSize: number): Observable<ServerResponse<Post[]>> {
        return this.http.get<ServerResponse<Post[]>>(
            `${environment.baseUrl}/post/post/getFollowingPosts`,
            {
                params: {
                    pageNumber: String(pageNumber),
                    pageSize: String(pageSize)
                }
            }
        ).pipe(
            map(result => Object.assign(new ServerResponse<Post[]>(), result)),
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
