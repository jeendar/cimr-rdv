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
    customBreadcrumb: 'Reservation'
  }
},{
  path: 'rdv/recap',
  component: RsvRecapComponent,
  data: {
    customBreadcrumb: 'Recapitulatif'
  }
},{
  path: 'rdv/gerer',
  component: RsvManageComponent,
  data: {
    customBreadcrumb: 'Gérer'
  }
},{
  path: 'rdv/verification',
  component: RsvOtpComponent,
  data: {
    customBreadcrumb: 'Vérifiaction'
  }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule { }
