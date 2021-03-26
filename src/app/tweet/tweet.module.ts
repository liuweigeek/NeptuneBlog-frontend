import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendBoxComponent, TweetCardComponent, TweetZoneComponent } from './component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        TweetCardComponent,
        TweetZoneComponent,
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
