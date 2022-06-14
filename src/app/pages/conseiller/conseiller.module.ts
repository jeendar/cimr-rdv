import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseillerRoutingModule } from './conseiller-routing.module';
import { ConseillerComponent } from './conseiller.component';
import { ConseillerListComponent } from './conseiller-list/conseiller-list.component';
import { NewConseillerComponent } from './new-conseiller/new-conseiller.component';
import { EditconseillerComponent } from './edit-conseiller/edit-conseiller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConseillerComponent,
    ConseillerListComponent,
    NewConseillerComponent,
    EditconseillerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ConseillerRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]

})
export class ConseillerModule { }
