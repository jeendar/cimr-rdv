import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { differenceInBusinessDays, eachWeekendOfMonth, differenceInCalendarDays, setHours, eachWeekendOfYear, format } from 'date-fns';
import { DisabledTimeFn, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';
import { Rendezvous } from 'src/app/models/rendezvous';
import { RdvService } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  dateFormat = "yyyy-MM-dd HH:mm";

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
  
  constructor( private rdvService: RdvService,
      private router: Router) {}

    ngOnInit(): void {
      this.reservationForm = new FormGroup({
        dp: new FormControl('', [Validators.required]),
        identity: new FormControl('', [Validators.required]),
        idNum: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]), 
        phone: new FormControl('', [Validators.required]),
        agency: new FormControl('', [Validators.required]),
        serviceType: new FormControl('', [Validators.required]),
        datePicker: new FormControl(null, [Validators.required]),
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
      //console.log('submit', this.reservationForm.value);
      //let newRdv: Rendezvous;
      let newRdv=new Rendezvous();
      newRdv={
        'numdp':this.reservationForm.value.dp,
        'nom':this.reservationForm.value.lastName,
        'prenom':this.reservationForm.value.firstName,
        'typeId':this.reservationForm.value.identity,
        'numId':this.reservationForm.value.idNum,
        'adresse':this.reservationForm.value.address,
        'ville':this.reservationForm.value.city,
        'pays':this.reservationForm.value.country,
        'email':this.reservationForm.value.email,
        'phone':this.reservationForm.value.phone.e164Number,
        'agence':this.reservationForm.value.agency,
        'serviceType':this.reservationForm.value.serviceType,
        'dateRdv':this.reservationForm.value.datePicker
      };
     console.log(newRdv);

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
          console.log('invalidformcontrol')
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}