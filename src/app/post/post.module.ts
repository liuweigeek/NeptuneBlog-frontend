import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCardComponent } from './component/post-card/post-card.component';
import { NzAvatarModule, NzCommentModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';


@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    NzCommentModule,
    NzIconModule,
    NzAvatarModule,
    NzToolTipModule
  ]
})
export class PostModule { }
