import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Output() logout = new EventEmitter();

    constructor(private router: Router) {
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
}
