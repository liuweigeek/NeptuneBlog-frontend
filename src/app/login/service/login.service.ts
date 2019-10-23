import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ServerResponse, User } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<ServerResponse<User>> {
    return this.http.post<ServerResponse<User>>(
      `${environment.baseUrl}/user/user/login`,
      {
        email,
        password
      }
    ).pipe(
      map(result => Object.assign(new ServerResponse(), result)),
      timeout(environment.httpTimeout),
      catchError(e => {
        return this.handleError();
      })
    );
  }

  register(user: User): Observable<ServerResponse<User>> {
    return this.http.post<ServerResponse<User>>(
      `${environment.baseUrl}/user/user/register`, user
    ).pipe(
      map(result => Object.assign(new ServerResponse(), result)),
      timeout(environment.httpTimeout),
      catchError(e => {
        return this.handleError();
      })
    );
  }

  private handleError() {
    return of(ServerResponse.createByErrorMsg('操作失败'));
  }
}
