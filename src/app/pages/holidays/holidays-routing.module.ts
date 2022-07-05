import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHolidaysComponent } from './add-holidays/add-holidays.component';
import { EditHolidaysComponent } from './edit-holidays/edit-holidays.component';
import { HolidaysComponent } from './holidays.component';

const routes: Routes = [
  {
    path: '',
    component: HolidaysComponent
  },
  {
    path: 'holidays/new',
    component: AddHolidaysComponent
  },
  {
    path: 'holidays/update/:id',
    component: EditHolidaysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HolidaysRoutingModule { }
 