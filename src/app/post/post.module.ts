import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
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

@NgModule({
    declarations: [
        PostCardComponent,
        PostZoneComponent,
        PostDetailComponent,
        SendBoxComponent
    ],
    exports: [
        PostCardComponent
    ],
    imports: [
        CommonModule,
        PostRoutingModule,
        NzCommentModule,
        NzIconModule,
        NzAvatarModule,
        NzToolTipModule,
        NzPageHeaderModule,
        NzFormModule,
        FormsModule,
        NzButtonModule,
        NzInputModule,
        ReactiveFormsModule
    ]
})
export class PostModule {
}
