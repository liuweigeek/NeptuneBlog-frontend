import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import {
    NzButtonModule,
    NzCheckboxModule, NzDatePickerModule,
    NzFormModule, NzGridModule,
    NzIconModule,
    NzInputModule, NzRadioModule,
    NzSelectModule,
    NzToolTipModule
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './component/login';
import { SignInComponent } from './component/sign-in';
import { SignUpComponent } from './component/sign-up';

@NgModule({
    declarations: [SignInComponent, SignUpComponent, LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        NzFormModule,
        NzInputModule,
        ReactiveFormsModule,
        NzCheckboxModule,
        NzButtonModule,
        NzIconModule,
        NzToolTipModule,
        NzSelectModule,
        NzGridModule,
        NzDatePickerModule,
        FormsModule,
        NzRadioModule
    ],
    exports: [
        SignUpComponent
    ],
    providers: [
        SignUpComponent
    ]
})
export class LoginModule {
}
