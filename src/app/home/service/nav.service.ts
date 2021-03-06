import { Injectable } from '@angular/core';
import { NavMenuItem } from '../component';
import { Observable, of } from 'rxjs';
import { UserStoreService } from '../../shared';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    constructor(private userStoreService: UserStoreService) {
    }

    getNavMenus(): Observable<NavMenuItem[]> {
        const user = this.userStoreService.getAuthUser();
        return of([
            {title: '主页', icon: 'home', link: '/'},
            {title: '好友圈', icon: 'team', link: ''},
            {title: '探索', icon: 'compass', link: ''},
            {title: '通知', icon: 'notification', link: ''},
            {title: '私信', icon: 'mail', link: ''},
            {title: '喜欢', icon: 'like', link: ''},
            {title: '个人资料', icon: 'user', link: `/${user.username}`}
        ]);
    }
}
