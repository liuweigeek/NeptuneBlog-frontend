import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    NzAvatarModule, NzButtonModule,
    NzCommentModule,
    NzFormModule,
    NzGridModule,
    NzIconModule, NzInputModule, NzListModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzToolTipModule
} from 'ng-zorro-antd';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './component/home';
import { NavComponent } from './component/nav';
import { ContentComponent } from './component/content';
import { SendBoxComponent } from './component/send-box';
import { FormsModule } from '@angular/forms';
import { RecommendComponent } from './component/recommend/recommend.component';
import { PostModule } from '../post/post.module';

@NgModule({
  declarations: [HomeComponent, ContentComponent, NavComponent, SendBoxComponent, RecommendComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        NzGridModule,
        NzMenuModule,
        NzIconModule,
        NzToolTipModule,
        NzPageHeaderModule,
        NzCommentModule,
        NzFormModule,
        FormsModule,
        NzInputModule,
        NzAvatarModule,
        NzButtonModule,
        NzListModule,
        PostModule
    ]
})
export class HomeModule { }
