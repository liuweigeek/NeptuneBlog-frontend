import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard';
import { LoginComponent } from './login/component/login';
import { SearchResultListComponent } from './search/component/search-result-list';
import { UserProfileComponent } from './user/component/user-profile';
import { UserListComponent } from './user/component/user-list';
import { HomeComponent } from './home/component/home';
import { PostZoneComponent } from './post/component/post-zone';


const routes: Routes = [
  {
    path: 'signIn',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PostZoneComponent,
        pathMatch: 'full'
      },
      {
        path: 'search/:keyword',
        component: SearchResultListComponent,
        pathMatch: 'full'
      },
      {
        path: ':userId',
        component: UserProfileComponent,
        pathMatch: 'full'
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
