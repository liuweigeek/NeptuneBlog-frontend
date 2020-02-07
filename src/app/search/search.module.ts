import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchResultListComponent } from './component/search-result-list';
import { NzIconModule, NzInputModule, NzListModule, NzPageHeaderModule, NzToolTipModule } from 'ng-zorro-antd';
import { PostModule } from '../post';
import { UserModule } from '../user';

@NgModule({
    declarations: [SearchResultListComponent],
    imports: [
        CommonModule,
        NzPageHeaderModule,
        PostModule,
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
