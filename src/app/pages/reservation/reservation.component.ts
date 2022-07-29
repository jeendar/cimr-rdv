import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { differenceInBusinessDays, eachWeekendOfMonth, differenceInCalendarDays, setHours, eachWeekendOfYear, format } from 'date-fns';
import { DisabledTimeFn, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Agence } from 'src/app/models/agence';
import { Rendezvous } from 'src/app/models/rendezvous';
import { Service } from 'src/app/models/service';
import { AgenceService } from 'src/app/services/agence.service';
import { RdvService } from 'src/app/services/rdv.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  dateFormat = "yyyy-MM-dd HH:mm";
  agencesList:Agence[];
  servicesList:Service[];
  @Input() 
  @Output() isRdvCreated = new EventEmitter<{ value: boolean }>();
  reservationForm!: FormGroup;
  rdv: Rendezvous = new Rendezvous();
  submitted = false;

  weekends = eachWeekendOfYear(Date.now());
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Morocco, CountryISO.France];
  
  constructor( private rdvService: RdvService, private router: Router,
               private serviceService: ServiceService , private agenceService:AgenceService) {}

    ngOnInit(): void {
      this.agenceService.getAgencesList().subscribe({
          next: (data) => {this.agencesList= data;},
          error:(error) => { console.log(error);  }}  
      ); this.serviceService.getServicesList().subscribe({
          next: (data) => {this.servicesList= data;},
          error:(error) => { console.log(error);  }}  
      );
      this.reservationForm = new FormGroup({
        dp: new FormControl(null),
        identity: new FormControl('', [Validators.required]),
        idNum: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]), 
        phone: new FormControl('', [Validators.required]),
        agency: new FormControl(null, [Validators.required]),
        serviceType: new FormControl('', []),
        datePicker: new FormControl('', [Validators.required]),
      });
    }

  disabledDate = (current : Date) : boolean => differenceInBusinessDays(current, this.today) < 0;
  disabledWeekEnds = (value : Date) : boolean => {
    const day = value.getDay();
    return (day === 6) || (day === 0);
  };
  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }
  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
    const chosenDate = result.toLocaleString();
    this.reservationForm.get('datePicker')!.setValue(chosenDate);
    console.log('date :', chosenDate);
  }

  // identityChange(value: string): void {
  //   this.reservationForm.get('identity')!.setValue(value === 'cin' ? 'cin' : 'passport');
  // }
  save() {  
    this.rdvService
    .reserverRdv(this.rdv).subscribe(data => {
      console.log('data :', data)
      this.rdv = new Rendezvous();
      this.gotoRecap();
    }, 
    error => console.log(error));
  }
  gotoRecap() {
    this.router.navigate(['/recap']);
  }
  submit(){
    this.submitForm();
  }
  submitForm(): void {
    console.log(this.reservationForm.valid);
    if (this.reservationForm.valid) {
      console.log('reservationform is valid');
     // this.rdvService.reserverRdv(this.reservationForm.value.value);
      // this.submitted = true;
      //this.save(); 
      console.log('submit', this.reservationForm.value);
      //let newRdv: Rendezvous;
      let newRdv=new Rendezvous();
      newRdv.idagence=this.reservationForm.value.agency;
      newRdv.serviceType=this.reservationForm.value.service;
      console.log("before", newRdv);
      newRdv={
        'numdp':this.reservationForm.value.dp,
        'nom':this.reservationForm.value.lastName,
        'prenom':this.reservationForm.value.firstName,
        'typePieceIdentite':this.reservationForm.value.identity,
        'numPieceIdentite':this.reservationForm.value.idNum,
        'adresse':this.reservationForm.value.address,
        'ville':this.reservationForm.value.city,
        'pays':this.reservationForm.value.country,
        'adresseMail':this.reservationForm.value.email,
        'numGSM':this.reservationForm.value.phone.e164Number,
        'idagence':this.reservationForm.value.agency,
        'serviceType':this.reservationForm.value.serviceType,
        'date':this.reservationForm.value.datePicker
      };
      console.log("after", newRdv);
     
//     if(this.separateDialCode.valueOf(this.reservationForm)){     }

     this.rdvService.reserverRdv(newRdv)
        .subscribe({
          next :()=> {
            console.log('response');
          },
          error :()=>{
            console.log('error');}
          });
    } else {
      Object.values(this.reservationForm.controls).forEach(control  => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
 
}