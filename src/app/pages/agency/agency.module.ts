import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgencyRoutingModule } from './agency-routing.module';
import { AgencyComponent } from './agency.component';
import { AgencyListComponent } from './agency-list/agency-list.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';


@NgModule({
  declarations: [
    AgencyComponent,
    AgencyListComponent,
    NewAgencyComponent,
    EditAgencyComponent
  ],
  imports: [
    CommonModule,
    AgencyRoutingModule
  ]
})
export class AgencyModule { }
