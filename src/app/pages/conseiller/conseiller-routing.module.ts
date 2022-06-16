import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditconseillerComponent } from './edit-conseiller/edit-conseiller.component';
import { NewConseillerComponent } from './new-conseiller/new-conseiller.component';
import { ConseillerComponent } from './conseiller.component';

const routes: Routes = [
  {
    path: 'conseiller/list',
    component: ConseillerComponent
  },
  {
    path: 'conseiller/new',
    component: NewConseillerComponent
  },
  {
    path: 'conseiller/update',
    component: EditconseillerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConseillerRoutingModule { }
 