import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth',
    templateUrl: './authentication.component.html',
    styleUrls: ['./authentication.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }
}
