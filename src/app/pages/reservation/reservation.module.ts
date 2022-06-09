import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent, NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RsvRecapComponent } from './rsv-recap/rsv-recap.component';
import { RsvManageComponent } from './rsv-manage/rsv-manage.component';
import { RsvOtpComponent } from './rsv-otp/rsv-otp.component';


@NgModule({
  declarations: [
    RsvRecapComponent,
    RsvManageComponent,
    RsvOtpComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
