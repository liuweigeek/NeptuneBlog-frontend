import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared';
import { SearchResultListComponent } from './search';
import { UserListComponent, UserProfileComponent } from './user';
import { HomeComponent } from './home';
import { TweetZoneComponent } from './tweet';
import { AddInfoComponent, AuthenticationComponent, SignInComponent, SignUpComponent } from './authentication';


const routes: Routes = [
    {
        path: 'auth',
        component: AuthenticationComponent,
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
                component: TweetZoneComponent,
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
