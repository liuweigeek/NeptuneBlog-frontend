import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    canActivate: [AuthGuard],
    pathMatch: 'full'
  },
  {
    path: 'signIn',
    loadChildren: () => import('./login').then(m => m.LoginModule)
  },
  {
    path: 'signUp',
    loadChildren: () => import('./login').then(m => m.LoginModule)
  },
  {
    path: 'user',
    canActivate: [AuthGuard],
    loadChildren: () => import('./user').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
