import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserCenterComponent } from './component/user-center';
import { UserSettingsComponent } from './component/user-settings';


@NgModule({
  declarations: [UserCenterComponent, UserSettingsComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
