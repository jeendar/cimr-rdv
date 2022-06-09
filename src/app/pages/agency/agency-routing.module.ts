import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyListComponent } from './agency-list/agency-list.component';
import { AgencyComponent } from './agency.component';
import { EditAgencyComponent } from './edit-agency/edit-agency.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';

const routes: Routes = [
  {
    path: '',
    component: AgencyComponent
  },
  {
    path: 'agency/list',
    component: AgencyListComponent
  },
  {
    path: 'agency/new',
    component: NewAgencyComponent
  },
  {
    path: 'agency/update',
    component: EditAgencyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
 