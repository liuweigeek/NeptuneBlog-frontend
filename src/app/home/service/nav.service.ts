import { Injectable } from '@angular/core';
import { NavMenuItem } from '../component/nav';
import { Observable, of } from 'rxjs';
import { UserStoreService } from '../../shared/service';

@Injectable({
    providedIn: 'root'
})
export class NavService {

    constructor(private userStoreService: UserStoreService) {
    }

    user = this.userStoreService.getLoginUser();
    navMenuItems: NavMenuItem[] = [
        {title: '主页', icon: 'home', link: '/'},
        {title: '好友圈', icon: 'team', link: ''},
        {title: '探索', icon: 'compass', link: ''},
        {title: '通知', icon: 'notification', link: ''},
        {title: '私信', icon: 'mail', link: ''},
        {title: '喜欢', icon: 'like', link: ''},
        {title: '个人资料', img: this.user.smallAvatar, link: ''}
    ];

    getNavMenus(): Observable<NavMenuItem[]> {
        return of(this.navMenuItems);
    }
}
