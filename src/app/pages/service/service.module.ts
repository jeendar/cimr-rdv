import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    ServiceComponent,
    NewServiceComponent,
    EditServiceComponent
  ],
  imports: [
    CommonModule,
    ServiceRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule
  ]
})
export class ServiceModule { }
