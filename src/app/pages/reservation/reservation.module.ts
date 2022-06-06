import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationRoutingModule } from './reservation-routing.module';
import { NzFormControlComponent, NzFormDirective, NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    NzFormModule,
  ]
})
export class ReservationModule { }
