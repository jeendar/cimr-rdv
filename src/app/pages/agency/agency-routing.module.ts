import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyComponent } from './agency.component';
import { NewAgencyComponent } from './new-agency/new-agency.component';

const routes: Routes = [
  {
    path: 'agences/list',
    component: AgencyComponent
  },
  {
    path: 'agences/new',
    component: NewAgencyComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgencyRoutingModule { }
 