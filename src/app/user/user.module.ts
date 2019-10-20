import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCenterComponent } from './component/user-center';
import { UserSettingsComponent } from './component/user-settings';
import { UserListComponent } from './component/user-list';
import { UserProfileComponent } from './component/user-profile';
import { NzButtonModule, NzIconModule, NzListModule, NzPageHeaderModule, NzSkeletonModule, NzToolTipModule } from 'ng-zorro-antd';
import { PostModule } from '../post';

@NgModule({
    declarations: [
        UserCenterComponent,
        UserSettingsComponent,
        UserListComponent,
        UserProfileComponent,
        UserListComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        NzListModule,
        NzButtonModule,
        NzSkeletonModule,
        NzPageHeaderModule,
        NzToolTipModule,
        NzIconModule,
        PostModule
    ],
    exports: [
        UserCenterComponent,
        UserSettingsComponent,
        UserListComponent,
        UserProfileComponent
    ]
})
export class UserModule {
}
