import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddInfoComponent, AuthenticationComponent, SignInComponent, SignUpComponent } from './component';
import { RouterModule } from '@angular/router';

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
