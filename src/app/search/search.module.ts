import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultListComponent } from './component/search-result-list';
import { NzIconModule, NzInputModule, NzListModule, NzPageHeaderModule, NzToolTipModule } from 'ng-zorro-antd';
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
