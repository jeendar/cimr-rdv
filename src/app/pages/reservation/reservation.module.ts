import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RsvRecapComponent } from './rsv-recap/rsv-recap.component';
import { RsvManageComponent } from './rsv-manage/rsv-manage.component';
import { RsvOtpComponent } from './rsv-otp/rsv-otp.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  declarations: [
    RsvRecapComponent,
    RsvManageComponent,
    RsvOtpComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    NzGridModule,
    NzFormModule,
    NzInputModule,
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ReservationModule { }
