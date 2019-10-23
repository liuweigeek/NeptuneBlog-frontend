import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultListComponent } from './component/search-result-list';
import { NzPageHeaderModule } from 'ng-zorro-antd';
import { PostModule } from '../post';

@NgModule({
  declarations: [SearchResultListComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    NzPageHeaderModule,
    PostModule
  ],
  exports: [SearchResultListComponent]
})
export class SearchModule {
}
