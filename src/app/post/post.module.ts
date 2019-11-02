import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostCardComponent } from './component/post-card';
import {
  NzAvatarModule,
  NzButtonModule,
  NzCommentModule,
  NzFormModule,
  NzIconModule,
  NzInputModule,
  NzPageHeaderModule,
  NzToolTipModule
} from 'ng-zorro-antd';
import { PostZoneComponent } from './component/post-zone';
import { PostDetailComponent } from './component/post-detail';
import { SendBoxComponent } from './component/send-box';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostCardComponent,
    PostZoneComponent,
    PostDetailComponent,
    SendBoxComponent
  ],
  exports: [
    PostCardComponent,
    PostZoneComponent
  ],
  imports: [
    CommonModule,
    NzCommentModule,
    NzIconModule,
    NzAvatarModule,
    NzToolTipModule,
    NzPageHeaderModule,
    NzFormModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class PostModule {
}
