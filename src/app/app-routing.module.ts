import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard';
import { LoginComponent } from './login/component/login';
import { SearchResultListComponent } from './search/component/search-result-list';
import { UserProfileComponent } from './user/component/user-profile';
import { UserListComponent } from './user/component/user-list';
import { HomeComponent } from './home/component/home';
import { PostZoneComponent } from './post/component/post-zone';
import { SignInComponent } from './login/component/sign-in';
import { SignUpComponent } from './login/component/sign-up';
import { AddInfoComponent } from './login/component/add-info';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        children: [
            {
                path: '',
                redirectTo: 'signIn',
                pathMatch: 'full'
            },
            {
                path: 'signIn',
                component: SignInComponent
            },
            {
                path: 'signUp',
                component: SignUpComponent
            },
            {
                path: 'addInfo',
                component: AddInfoComponent,
                canActivate: [AuthGuard]
            }
        ]
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
                path: ':username',
                component: UserProfileComponent,
                pathMatch: 'full'
            },
            {
                path: ':username/followings',
                component: UserListComponent,
                pathMatch: 'full'
            },
            {
                path: ':username/followers',
                component: UserListComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
