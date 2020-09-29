import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AppRoutingModule } from './app-routing.module';

import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptor';
import { HomeModule } from './home';
import { AuthenticationModule } from './authentication';

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        NzFormModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NzMessageModule,
        HomeModule,
        AuthenticationModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: NZ_I18N, useValue: zh_CN}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
