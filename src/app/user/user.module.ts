import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCenterComponent } from './component/user-center';
import { UserSettingsComponent } from './component/user-settings';
import { UserListComponent } from './component/user-list';
import { UserProfileComponent } from './component/user-profile';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TweetModule } from '../tweet';
import { UserItemComponent } from './component/user-item';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        UserCenterComponent,
        UserSettingsComponent,
        UserListComponent,
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
        UserCenterComponent,
        UserSettingsComponent,
        UserListComponent,
        UserProfileComponent,
        UserItemComponent
    ]
})
export class UserModule {
}
