import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home';
import { UserListComponent } from '../user/component/user-list';
import { PostZoneComponent } from '../post/component/post-zone';
import { UserProfileComponent } from '../user/component/user-profile';
import { SearchResultListComponent } from '../search/component/search-result-list';
import { AuthGuard } from '../shared/guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        component: PostZoneComponent
      },
      {
        path: 'search/:keyword',
        component: SearchResultListComponent
      },
      {
        path: ':userId/followings',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {
        path: ':userId/followers',
        component: UserListComponent,
        pathMatch: 'full'
      },
      {
        path: ':userId',
        component: UserProfileComponent,
        children: [

        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
