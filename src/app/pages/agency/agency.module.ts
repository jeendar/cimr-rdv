import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';
import {  NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { GeolocationComponent } from 'src/app/components/geolocation/geolocation.component';
import { GoogleMapsModule } from '@angular/google-maps';


@NgModule({
  declarations: [
    AgencyComponent,
    NewAgencyComponent,
    EditAgencyComponent,
    GeolocationComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule,
    NzFormModule,
    NzRadioModule,
    NzModalModule,
    NzPopconfirmModule,
    NzInputModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class AgencyModule { }
