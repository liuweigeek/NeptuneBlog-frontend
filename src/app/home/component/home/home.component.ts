import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavMenuItem } from '../nav';
import { NavService } from '../../service';

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
        private cd: ChangeDetectorRef) {
    }


    ngOnInit() {
        this.navMenuItems$ = this.navService.getNavMenus();
        this.navMenuItems$.subscribe(() => this.cd.markForCheck());
    }

}
