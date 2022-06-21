import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { differenceInBusinessDays, eachWeekendOfMonth, differenceInCalendarDays, setHours, eachWeekendOfYear } from 'date-fns';
import { DisabledTimeFn, NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { CountryISO, PhoneNumberFormat, SearchCountryField } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {

  validateForm!: FormGroup;
  
  separateDialCode = false;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
	phoneForm = new FormGroup({
		phone: new FormControl(undefined, [Validators.required])
	});

	changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}

  weekends = eachWeekendOfYear(Date.now())
  //weekend = weekends.toStringDate;
  today = new Date();
  timeDefaultValue = setHours(new Date(), 0);
  
  range (start : number, end : number): number[] {
    const result : number[] = [];
    for (let i = start; i < end ; i++){
      result.push(i);
    }
    return result;
  }

  disabledDate = (current : Date) : boolean => differenceInBusinessDays(current, this.today) < 0;

  disabledWeekEnds = (value : Date) : boolean => {
    const day = value.getDay();
    return (day === 6) || (day === 0);
  };


  disabledDateTime: DisabledTimeFn = () => ({
    nzDisabledHours: () => this.range(30, 60),
    nzDisabledMinutes: () => this.range(30, 60),
    nzDisabledSeconds: () => this.range(0, 60),
  });


  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control  => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  identityChange(value: string): void {
    this.validateForm.get('identity')!.setValue(value === 'cin' ? 'cin' : 'passport!');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      dp: ['', [Validators.required]],
      identitytype: ['', [Validators.required]],
      idNum: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNum: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      serviceType: ['', [Validators.required]],
      datePicker: [null],
      datePickerTime: [null],
      monthPicker: [null],
      rangePicker: [[]],
      rangePickerTime: [[]],
      timePicker: [null]
    });
  }
}
