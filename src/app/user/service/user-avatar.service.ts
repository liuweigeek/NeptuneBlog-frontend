import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServerResponse, User } from '../../shared/entity';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserAvatarService {

    constructor(private http: HttpClient) {
    }

    uploadAvatar(formData: FormData): Observable<ServerResponse<User>> {

        return this.http.post<ServerResponse<User>>(
            `${environment.baseUrl}/user/userAvatar/uploadAvatar`,
            formData,
            {}
        ).pipe(
            map(result => Object.assign(new ServerResponse<User>(), result)),
            timeout(environment.httpTimeout),
            catchError(() => {
                return of(ServerResponse.createByErrorMsg('上传头像失败'));
            })
        );


    }
}
