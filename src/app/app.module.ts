import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ReservationRoutingModule } from './pages/reservation/reservation-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { ServiceRoutingModule } from './pages/service/service-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HolidaysComponent } from './pages/holidays/holidays.component';
import { NzFormControlComponent, NzFormItemComponent, NzFormModule, NzFormSplitComponent } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputDirective, NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ConseillerRoutingModule } from './pages/conseiller/conseiller-routing.module';
import { RsvRecapComponent } from './pages/reservation/rsv-recap/rsv-recap.component';
import { RsvManageComponent } from './pages/reservation/rsv-manage/rsv-manage.component';
import { RsvOtpComponent } from './pages/reservation/rsv-otp/rsv-otp.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { AgencyComponent } from './pages/agency/agency.component';
import { AgencyRoutingModule } from './pages/agency/agency-routing.module';
import { WorkinghoursComponent } from './pages/workinghours/workinghours.component';
import { HistoriqueRdvComponent } from './pages/historique-rdv/historique-rdv.component';
import { TraitementRdvComponent } from './pages/traitement-rdv/traitement-rdv.component';
import { LoginComponent } from './pages/login/login.component';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { RdvConseillerComponent } from './pages/rdv-conseiller/rdv-conseiller.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NzModalModule } from 'ng-zorro-antd/modal';


registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    ReservationComponent,
    WelcomeComponent,
    WorkinghoursComponent,
    HistoriqueRdvComponent,
    TraitementRdvComponent,
    HolidaysComponent,
    LoginComponent,
    RsvRecapComponent,
    RsvManageComponent,
    RsvOtpComponent,
    NotFoundComponent,
    RdvConseillerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzDropDownModule,
    NzModalModule,
    ServiceRoutingModule,
    ConseillerRoutingModule,
    ReservationRoutingModule,
    AgencyRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzDatePickerModule,
    NzInputModule,
    NzSelectModule,
    NzDividerModule,
    NzSpaceModule,
    NzDescriptionsModule,
    NzEmptyModule,
    NzTableModule,
    NzTreeViewModule,
    NzListModule,    
    NzRadioModule,
    NzResultModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }
