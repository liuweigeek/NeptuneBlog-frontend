import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/entity';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserAvatarService {

    constructor(private http: HttpClient) {
    }

    uploadAvatar(formData: FormData): Observable<User> {

        return this.http.post<User>(
            `${environment.baseUrl}/user-server/avatars`,
            formData,
            {}
        ).pipe(
            timeout(environment.httpTimeout)
        );


    }
}
