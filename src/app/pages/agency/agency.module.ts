import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';
import {  NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    AgencyComponent,
    NewAgencyComponent,
    EditAgencyComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule
  ]
})
export class AgencyModule { }
