import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultListComponent } from './component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TweetModule } from '../tweet';
import { UserModule } from '../user';

@NgModule({
    declarations: [SearchResultListComponent],
    imports: [
        CommonModule,
        NzPageHeaderModule,
        TweetModule,
        NzInputModule,
        NzIconModule,
        NzToolTipModule,
        UserModule,
        NzListModule
    ],
    exports: [SearchResultListComponent]
})
export class SearchModule {
}
