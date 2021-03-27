import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavMenuItem } from '../nav';
import { NavService } from '../../service';
import { Const, UserStoreService } from '../../../shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

    navMenuItems$: Observable<NavMenuItem[]>;

    constructor(
        private navService: NavService,
        private userStoreService: UserStoreService,
        private router: Router,
        private cd: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.navMenuItems$ = this.navService.getNavMenus();
        this.navMenuItems$.subscribe(() => this.cd.markForCheck());
    }

    logOut() {
        this.userStoreService.clearAuthUser();
        this.router.navigate([Const.signInRoute]);
    }

}
