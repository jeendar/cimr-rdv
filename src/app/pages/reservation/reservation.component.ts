import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { differenceInBusinessDays, eachWeekendOfMonth, differenceInCalendarDays, setHours, eachWeekendOfYear } from 'date-fns';
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

  reservationForm!: FormGroup;
  rdv: Rendezvous = new Rendezvous();
  submitted = false;

  weekends = eachWeekendOfYear(Date.now())
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.Morocco, CountryISO.France];
  
  constructor(private fb: FormBuilder,
    private rdvService: RdvService,
    private router: Router) {}

    ngOnInit(): void {
      this.reservationForm = this.fb.group({
        dp: ['', [Validators.required]],
        identity: ['', [Validators.required]],
        idNum: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]], 
        phone: ['', [Validators.required]],
        agency: ['', [Validators.required]],
        serviceType: ['', [Validators.required]],
        datePicker: [null],
        datePickerTime: [null],
        monthPicker: [null],
        timePicker: [null]
      });
    }

  // range (start : number, end : number): number[] {
  //   const result : number[] = [];
  //   for (let i = start; i < end ; i++){
  //     result.push(i);
  //   }
  //   return result;
  // }

  // disabledDateTime: DisabledTimeFn = () => ({
  //   nzDisabledHours: () => this.range(30, 60),
  //   nzDisabledMinutes: () => this.range(30, 60),
  //   nzDisabledSeconds: () => this.range(0, 60),
  // });
  
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
  }

  // identityChange(value: string): void {
  //   this.reservationForm.get('identity')!.setValue(value === 'cin' ? 'cin' : 'passport');
  // }
  save() {
    this.rdvService
    .reserverRdv(this.rdv).subscribe(data => {
      console.log(data)
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
    if (this.reservationForm.valid) {
      this.submitted = true;
      this.save(); 
      console.log('submit', this.reservationForm.value);
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
