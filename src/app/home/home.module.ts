import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { FormsModule } from '@angular/forms';
import { TweetModule } from '../tweet';
import { HomeComponent } from './component/home';
import { NavComponent } from './component/nav';
import { ContentComponent } from './component/content';
import { RecommendComponent } from './component/recommend';
import { UserModule } from '../user';
import { SearchModule } from '../search';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent,
        ContentComponent,
        NavComponent,
        RecommendComponent
    ],
    imports: [
        CommonModule,
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
        TweetModule,
        UserModule,
        SearchModule,
        RouterModule
    ]
})
export class HomeModule {
}
