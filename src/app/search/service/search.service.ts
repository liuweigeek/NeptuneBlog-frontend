import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from '../../shared';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    constructor(private http: HttpClient) {
    }

    searchByKeyword(keyword: string): Observable<SearchResult> {
        return this.http.get<SearchResult>(
            `${environment.baseUrl}/search-server/search`,
            {
                params: {
                    q: keyword
                }
            }
        ).pipe(
            timeout(environment.httpTimeout)
        );
    }
}
