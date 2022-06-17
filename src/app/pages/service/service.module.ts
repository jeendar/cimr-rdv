import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzRadioModule } from 'ng-zorro-antd/radio';

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
    NzGridModule,
    NzRadioModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ServiceModule { }
