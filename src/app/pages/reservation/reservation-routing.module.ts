import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationComponent } from './reservation.component';
import { RsvManageComponent } from './rsv-manage/rsv-manage.component';
import { RsvOtpComponent } from './rsv-otp/rsv-otp.component';
import { RsvRecapComponent } from './rsv-recap/rsv-recap.component';

const routes: Routes = [{
  path: '',
  component: ReservationComponent,
  data: {
    breadcrumb: 'Reservation'
  }
},{
  path: 'reservation/recap',
  component: RsvRecapComponent,
  data: {
    breadcrumb: 'Recapitulatif'
  }
},{
  path: 'reservation/gerer',
  component: RsvManageComponent,
  data: {
    breadcrumb: 'Gérer'
  }
},{
  path: 'reservation/validation',
  component: RsvOtpComponent,
  data: {
    breadcrumb: 'Vérifiaction'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
