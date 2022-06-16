import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseillerRoutingModule } from './conseiller-routing.module';
import { ConseillerComponent } from './conseiller.component';
import { NewConseillerComponent } from './new-conseiller/new-conseiller.component';
import { EditconseillerComponent } from './edit-conseiller/edit-conseiller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';


@NgModule({
  declarations: [
    ConseillerComponent,
    NewConseillerComponent,
    EditconseillerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConseillerRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzGridModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ConseillerModule { }
