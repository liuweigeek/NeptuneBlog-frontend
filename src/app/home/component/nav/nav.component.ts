import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Const, UserStoreService } from '../../../shared';
import { Router } from '@angular/router';

export class NavMenuItem {
    title: string;
    icon?: string;
    img?: string;
    link: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

    initSelectedMenu: NavMenuItem;
    @Input() menuItems: NavMenuItem[];

    constructor(private userStoreService: UserStoreService,
                private router: Router) {
    }

    ngOnInit() {
        if (this.menuItems && this.menuItems.length > 0) {
            const url = this.router.url;
            this.initSelectedMenu = this.menuItems.find(item => item.link === url);
            if (!this.initSelectedMenu) {
                this.initSelectedMenu = this.menuItems[0];
            }
        }
    }

    logOut() {
        this.userStoreService.clearAuthUser();
        this.router.navigate([Const.signInRoute]);
    }
}
