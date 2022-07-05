import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  { path: '', component: WelcomeComponent, data: {breadcrumb: 'Accueil'} },
  { path: 'holidays', loadChildren: () => import('./pages/holidays/holidays.module').then(m => m.HolidaysModule), data: {breadcrumb: 'Jours Fériés'} },
  { path: 'workinghours', component: WorkinghoursComponent, data: {breadcrumb: 'Temps de travail'} },
  { path: 'rdv/traitement', component: TraitementRdvComponent, data: {breadcrumb: 'Traitement des RDV'} },
  { path: 'rdv/historique', component: HistoriqueRdvComponent, data: {breadcrumb: 'Historique des RDV'} },
  { path: 'rdv-conseiller', component: RdvConseillerComponent, data: {breadcrumb: 'Jours Fériés'} },
  { path: 'reservation', component: ReservationComponent, data: {breadcrumb: 'Réservation'} },
 
  { path: 'user', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), data: {breadcrumb: 'Login'} },
  { path: 'service', loadChildren: () => import('./pages/service/service.module').then(m => m.ServiceModule), data: {breadcrumb: 'Services'} },
  { path: 'conseiller', loadChildren: () => import('./pages/conseiller/conseiller.module').then(m => m.ConseillerModule), data: {breadcrumb: 'Conseillers'} },
  { path: 'agences', loadChildren: () => import('./pages/agency/agency.module').then(m => m.AgencyModule), data: {breadcrumb: 'Agency'} },
  
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), data: {breadcrumb: 'Espace administrateur'} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
