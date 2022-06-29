import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup/signup.component';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzRadioModule,
    NzFormModule,
    NzInputModule,
    NzGridModule,
    NzButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class LoginModule { }
