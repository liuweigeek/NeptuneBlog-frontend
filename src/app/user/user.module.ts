import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCenterComponent } from './component/user-center';
import { UserSettingsComponent } from './component/user-settings';
import { UserListComponent } from './component/user-list';
import { UserProfileComponent } from './component/user-profile';
import { NzButtonModule, NzListModule, NzPageHeaderModule, NzSkeletonModule } from 'ng-zorro-antd';

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
        NzPageHeaderModule
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
