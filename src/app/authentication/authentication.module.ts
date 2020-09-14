import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    NzAvatarModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzRadioModule,
    NzSelectModule,
    NzToolTipModule,
    NzUploadModule
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationComponent } from './component/authentication';
import { SignInComponent } from './component/sign-in';
import { SignUpComponent } from './component/sign-up';
import { RouterModule } from '@angular/router';
import { AddInfoComponent } from './component/add-info';

@NgModule({
    declarations: [SignInComponent, SignUpComponent, AuthenticationComponent, AddInfoComponent],
    imports: [
        CommonModule,
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
        NzRadioModule,
        NzUploadModule,
        NzAvatarModule,
        RouterModule
    ],
    exports: [
        SignUpComponent
    ],
    providers: [
        SignUpComponent
    ]
})
export class AuthenticationModule {
}
