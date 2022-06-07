import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServiceComponent } from './edit-service/edit-service.component';
import { NewServiceComponent } from './new-service/new-service.component';
import { ServiceListComponent } from './service-list/service-list.component';
import { ServiceComponent } from './service.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent
  },
  {
    path: 'service/list',
    component: ServiceListComponent
  },
  {
    path: 'service/new',
    component: NewServiceComponent
  },
  {
    path: 'service/update',
    component: EditServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
 