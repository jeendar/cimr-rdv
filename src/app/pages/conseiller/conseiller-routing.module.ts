import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditconseillerComponent } from './edit-conseiller/edit-conseiller.component';
import { NewConseillerComponent } from './new-conseiller/new-conseiller.component';
import { ConseillerListComponent } from './conseiller-list/conseiller-list.component';
import { ConseillerComponent } from './conseiller.component';

const routes: Routes = [
  {
    path: '',
    component: ConseillerComponent
  },
  {
    path: 'conseiller/list',
    component: ConseillerListComponent
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
 