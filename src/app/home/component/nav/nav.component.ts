import { Component, Input, OnInit } from '@angular/core';

export class NavMenuItem {
    title: string;
    icon?: string;
    img?: string;
    link: string;
}

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

    private initSelectedMenu: NavMenuItem;
    @Input() menuItems: NavMenuItem[];

    constructor() {
    }

    ngOnInit() {
        if (this.menuItems && this.menuItems.length > 0) {
            this.initSelectedMenu = this.menuItems[0];
        }
    }
}
