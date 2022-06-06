import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'holidays', component: HolidaysComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'service', loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule)},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
