import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidaysRoutingModule } from './holidays-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HolidaysComponent } from './holidays.component';
import { AddHolidaysComponent } from './add-holidays/add-holidays.component';
import { EditHolidaysComponent } from './edit-holidays/edit-holidays.component';
import { ImportHolidaysComponent } from './import-holidays/import-holidays.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';


@NgModule({
  declarations: [
    HolidaysComponent,
    AddHolidaysComponent,
    EditHolidaysComponent,
    ImportHolidaysComponent
  ],
  imports: [
    CommonModule,
    HolidaysRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzDatePickerModule,
    NzRadioModule,
    NzModalModule,
    NzPopconfirmModule,
    NzInputModule
  ]
})
export class HolidaysModule { }
