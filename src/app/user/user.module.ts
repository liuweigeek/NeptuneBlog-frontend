import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCenterComponent } from './component/user-center';
import { UserSettingsComponent } from './component/user-settings';
import { UserListComponent } from './component/user-list';
import { UserProfileComponent } from './component/user-profile';
import {
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzListModule,
    NzPageHeaderModule,
    NzSkeletonModule,
    NzToolTipModule
} from 'ng-zorro-antd';
import { PostModule } from '../post';
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
        PostModule,
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
