import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TweetCardComponent } from './component/tweet-card';
import {
    NzAvatarModule,
    NzButtonModule,
    NzCommentModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzListModule,
    NzPageHeaderModule,
    NzSkeletonModule,
    NzToolTipModule
} from 'ng-zorro-antd';
import { TweetZoneComponent } from './component/tweet-zone';
import { TweetDetailComponent } from './component/tweet-detail';
import { SendBoxComponent } from './component/send-box';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        TweetCardComponent,
        TweetZoneComponent,
        TweetDetailComponent,
        SendBoxComponent
    ],
    exports: [
        TweetCardComponent,
        TweetZoneComponent
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
        RouterModule,
        NzListModule,
        NzSkeletonModule
    ]
})
export class TweetModule {
}
