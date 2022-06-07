import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';


@NgModule({
  declarations: [
    ServiceComponent,
    ServiceListComponent,
    NewServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule
  ]
})
export class ServiceModule { }
