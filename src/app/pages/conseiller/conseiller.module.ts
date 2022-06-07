import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConseillerRoutingModule } from './conseiller-routing.module';
import { ConseillerComponent } from './conseiller.component';
import { ConseillerListComponent } from './conseiller-list/conseiller-list.component';
import { NewConseillerComponent } from './new-conseiller/new-conseiller.component';
import { EditconseillerComponent } from './edit-conseiller/edit-conseiller.component';


@NgModule({
  declarations: [
    ConseillerComponent,
    ConseillerListComponent,
    NewConseillerComponent,
    EditconseillerComponent
  ],
  imports: [
    CommonModule,
    ConseillerRoutingModule
  ]
})
export class ConseillerModule { }
