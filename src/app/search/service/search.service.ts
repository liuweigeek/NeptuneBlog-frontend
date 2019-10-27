import { Injectable } from '@angular/core';
import { ServerResponse } from '../../shared/entity';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { catchError, map, timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {
  }

  searchByKeyword(keyword: string): Observable<ServerResponse<Map<string, ServerResponse<any>>>> {
    return this.http.get<ServerResponse<Map<string, ServerResponse<any>>>>(
      `${environment.baseUrl}/search/search/${keyword}`
    ).pipe(
      map(result => Object.assign(new ServerResponse<Map<string, ServerResponse<any>>>(), result)),
      timeout(environment.httpTimeout),
      catchError(() => {
        return of(ServerResponse.createByErrorMsg('搜索失败'));
      })
    );
  }
}
