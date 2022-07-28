import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { Role } from './models/role';
import { HistoriqueRdvComponent } from './pages/historique-rdv/historique-rdv.component';
import { AddHolidaysComponent } from './pages/holidays/add-holidays/add-holidays.component';
import { EditHolidaysComponent } from './pages/holidays/edit-holidays/edit-holidays.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RdvConseillerComponent } from './pages/rdv-conseiller/rdv-conseiller.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { TraitementRdvComponent } from './pages/traitement-rdv/traitement-rdv.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { WorkinghoursComponent } from './pages/workinghours/workinghours.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent},
  { path: 'holidays', loadChildren: () => import('./pages/holidays/holidays.module').then(m => m.HolidaysModule) },
  { path: 'workinghours', component: WorkinghoursComponent },
  { path: 'rdv/traitement', component: TraitementRdvComponent},
  { path: 'rdv/historique', component: HistoriqueRdvComponent},
  { path: 'rdv-conseiller', component: RdvConseillerComponent },
  { path: 'reservation', component: ReservationComponent },
 
  { path: 'login',  loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'service', loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule)},
  { path: 'conseiller', loadChildren: () => import('./pages/conseiller/conseiller.module').then(m => m.ConseillerModule) },
  { path: 'agences', loadChildren: () => import('./pages/agency/agency.module').then(m => m.AgencyModule) },
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), 
    canActivate: [AuthGuard], data: { roles: [Role.Admin] }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
