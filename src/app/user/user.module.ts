import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
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
import { UserItemComponent } from './component/user-item/user-item.component';

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
    UserRoutingModule,
    NzListModule,
    NzButtonModule,
    NzSkeletonModule,
    NzPageHeaderModule,
    NzToolTipModule,
    NzIconModule,
    PostModule,
    NzAvatarModule
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
