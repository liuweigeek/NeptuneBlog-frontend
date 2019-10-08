import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostCardComponent } from './component/post-card';
import { NzAvatarModule, NzCommentModule, NzIconModule, NzToolTipModule } from 'ng-zorro-antd';


@NgModule({
    declarations: [PostCardComponent],
    exports: [
        PostCardComponent
    ],
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
