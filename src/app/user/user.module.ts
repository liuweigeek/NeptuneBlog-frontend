import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserItemComponent, UserListComponent, UserProfileComponent } from './component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TweetModule } from '../tweet';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        UserProfileComponent,
        UserListComponent,
        UserItemComponent
    ],
    imports: [
        CommonModule,
        NzListModule,
        NzButtonModule,
        NzSkeletonModule,
        NzPageHeaderModule,
        NzToolTipModule,
        NzIconModule,
        TweetModule,
        NzAvatarModule,
        RouterModule
    ],
    exports: [
        UserListComponent,
        UserProfileComponent,
        UserItemComponent
    ]
})
export class UserModule {
}
