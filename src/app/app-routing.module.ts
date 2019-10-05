import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./home').then(m => m.HomeModule)},
    {path: 'signIn', loadChildren: () => import('./login').then(m => m.LoginModule)},
    {path: 'signUp', loadChildren: () => import('./login').then(m => m.LoginModule)},
    {path: 'user', loadChildren: () => import('./user').then(m => m.UserModule)}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
