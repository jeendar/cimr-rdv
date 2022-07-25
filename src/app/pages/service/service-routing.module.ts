import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewServiceComponent } from './new-service/new-service.component';
import { ServiceComponent } from './service.component';

const routes: Routes = [
  {
    path: 'service/list',
    component: ServiceComponent
  },
  {
    path: 'service/new',
    component: NewServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRoutingModule { }
 