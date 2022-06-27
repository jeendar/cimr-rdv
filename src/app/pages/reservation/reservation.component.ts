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

  listofCountryCodes=[
 {value: 'MA', label : '+212'},
 {value: 'BD', label : '+880'},
 {value: 'BE', label : '+32', },
 {value: 'BF', label : '+226'},
 {value: 'BG', label : '+359'},
 {value: 'BA', label : '+387'},
 {value: 'WF', label : '+681'},
 {value: 'BL', label : '+590'},
 {value: 'BN', label : '+673'},
 {value: 'BO', label : '+591'},
 {value: 'BH', label : '+973'},
 {value: 'BI', label : '+257'},
 {value: 'BJ', label : '+229'},
 {value: 'BT', label : '+975'},
 {value: 'BW', label : '+267'},
 {value: 'WS', label : '+685'},
 {value: 'BQ', label : '+599'},
 {value: 'BR', label : '+55', },
 {value: 'BY', label : '+375'},
 {value: 'BZ', label : '+501'},
 {value: 'RU', label : '+7'},
 {value: 'RW', label : '+250'},
 {value: 'RS', label : '+381'},
 {value: 'TL', label : '+670'},
 {value: 'RE', label : '+262'},
 {value: 'TM', label : '+993'},
 {value: 'TJ', label : '+992'},
 {value: 'RO', label : '+40'},
 {value: 'TK', label : '+690'},
 {value: 'GW', label : '+245'},
 {value: 'GU', label : '+1-67'},
 {value: 'GT', label : '+502'},
 {value: 'GR', label : '+30'},
 {value: 'GQ', label : '+240'},
 {value: 'GP', label : '+590'},
 {value: 'JP', label : '+81'},
 {value: 'GY', label : '+592'},
 {value: 'GG', label : '+44-1'},
 {value: 'GF', label : '+594'},
 {value: 'GE', label : '+995'},
 {value: 'GB', label : '+44'},
 {value: 'GA', label : '+241'},
 {value: 'SV', label : '+503'},
 {value: 'GN', label : '+224'},
 {value: 'GM', label : '+220'},
 {value: 'GL', label : '+299'},
 {value: 'GI', label : '+350'},
 {value: 'GH', label : '+233'},
 {value: 'OM', label : '+968'},
 {value: 'TN', label : '+216'},
 {value: 'JO', label : '+962'},
 {value: 'HR', label : '+385'},
 {value: 'HT', label : '+509'},
 {value: 'HU', label : '+36'},
 {value: 'HK', label : '+852'},
 {value: 'HN', label : '+504'},
 {value: 'VE', label : '+58'},
 {value: 'PR', label : '+1-787'},
 {value: 'PS', label : '+970'},
 {value: 'PW', label : '+680'},
 {value: 'PT', label : '+351'},
 {value: 'SJ', label : '+47'},
 {value: 'PY', label : '+595'},
 {value: 'IQ', label : '+964'},
 {value: 'PA', label : '+507'},
 {value: 'PG', label : '+675'},
 {value: 'PE', label : '+51'},
 {value: 'PK', label : '+92'},
 {value: 'PH', label : '+63'},
 {value: 'PN', label : '+870'},
 {value: 'PL', label : '+48'},
 {value: 'PM', label : '+508'},
 {value: 'ZM', label : '+260'},
 {value: 'EE', label : '+372'},
 {value: 'EG', label : '+20'},
 {value: 'ZA', label : '+27'},
 {value: 'EC', label : '+593'},
 {value: 'IT', label : '+39'},
 {value: 'VN', label : '+84'},
 {value: 'SB', label : '+677'},
 {value: 'ET', label : '+251'},
 {value: 'SO', label : '+252'},
 {value: 'ZW', label : '+263'},
 {value: 'SA', label : '+966'},
 {value: 'ES', label : '+34' },
 {value: 'ER', label : '+291'},
 {value: 'ME', label : '+382'},
 {value: 'MD', label : '+373'},
 {value: 'MG', label : '+261'},
 {value: 'MF', label : '+590'},
 {value: 'MC', label : '+377'},
 {value: 'UZ', label : '+998'},
 {value: 'MM', label : '+95' },
 {value: 'ML', label : '+223'},
 {value: 'MO', label : '+853'},
 {value: 'MN', label : '+976'},
 {value: 'MH', label : '+692'},
 {value: 'MK', label : '+389'},
 {value: 'MU', label : '+230'},
 {value: 'MT', label : '+356'},
 {value: 'MW', label : '+265'},
 {value: 'MV', label : '+960'},
 {value: 'MQ', label : '+596'},
 {value: 'MP', label : '+1-67'},
 {value: 'MS', label : '+1-66'},
 {value: 'MR', label : '+222'},
 {value: 'IM', label : '+44-1624'},
 {value: 'UG', label : '+256'},
 {value: 'TZ', label : '+255'},
 {value: 'MY', label : '+60'},
 {value: 'MX', label : '+52'},
 {value: 'IL', label : '+972'},
 {value: 'FR', label : '+33'},
 {value: 'IO', label : '+246'},
 {value: 'SH', label : '+290'},
 {value: 'FI', label : '+358'},
 {value: 'FJ', label : '+679'},
 {value: 'FK', label : '+500'},
 {value: 'FM', label : '+691'},
 {value: 'FO', label : '+298'},
 {value: 'NI', label : '+505'},
 {value: 'NL', label : '+31' },
 {value: 'NO', label : '+47' },
 {value: 'NA', label : '+264'},
 {value: 'VU', label : '+678'},
 {value: 'NC', label : '+687'},
 {value: 'NE', label : '+227'},
 {value: 'NF', label : '+672'},
 {value: 'NG', label : '+234'},
 {value: 'NZ', label : '+64'},
 {value: 'NP', label : '+977'},
 {value: 'NR', label : '+674'},
 {value: 'NU', label : '+683'},
 {value: 'CK', label : '+682'},
 {value: 'CI', label : '+225'},
 {value: 'CH', label : '+41'},
 {value: 'CO', label : '+57'},
 {value: 'CN', label : '+86'},
 {value: 'CM', label : '+237'},
 {value: 'CL', label : '+56'},
 {value: 'CC', label : '+61'},
 {value: 'CA', label : '+1'},
 {value: 'CG', label : '+242'},
 {value: 'CF', label : '+236'},
 {value: 'CY', label : '+357'},
 {value: 'CX', label : '+61'},
 {value: 'CR', label : '+506'},
 {value: 'CW', label : '+599'},
 {value: 'CV', label : '+238'},
 {value: 'CU', label : '+53'},
 {value: 'SZ', label : '+268'},
 {value: 'SY', label : '+963'},
 {value: 'SX', label : '+599'},
 {value: 'KG', label : '+996'},
 {value: 'KE', label : '+254'},
 {value: 'SS', label : '+211'},
 {value: 'SR', label : '+597'},
 {value: 'KI', label : '+686'},
 {value: 'KH', label : '+855'},
 {value: 'KN', label : '+1-86'},
 {value: 'KM', label : '+269'},
 {value: 'ST', label : '+239'},
 {value: 'SK', label : '+421'},
 {value: 'KR', label : '+82'},
 {value: 'SI', label : '+386'},
 {value: 'KP', label : '+850'},
 {value: 'KW', label : '+965'},
 {value: 'SN', label : '+221'},
 {value: 'SM', label : '+378'},
 {value: 'SL', label : '+232'},
 {value: 'SC', label : '+248'},
 {value: 'KZ', label : '+7'},
 {value: 'SG', label : '+65'},
 {value: 'SE', label : '+46'},
 {value: 'SD', label : '+249'},
 {value: 'DJ', label : '+253'},
 {value: 'DK', label : '+45'},
 {value: 'DE', label : '+49'},
 {value: 'YE', label : '+967'},
 {value: 'DZ', label : '+213'},
 {value: 'US', label : '+1'},
 {value: 'UY', label : '+598'},
 {value: 'YT', label : '+262'},
 {value: 'UM', label : '+1'},
 {value: 'LB', label : '+961'},
 {value: 'LA', label : '+856'},
 {value: 'TV', label : '+688'},
 {value: 'TW', label : '+886'},
 {value: 'TR', label : '+90'},
 {value: 'LK', label : '+94'},
 {value: 'LI', label : '+423'},
 {value: 'LV', label : '+371'},
 {value: 'TO', label : '+676'},
 {value: 'LT', label : '+370'},
 {value: 'LU', label : '+352'},
 {value: 'LR', label : '+231'},
 {value: 'LS', label : '+266'},
 {value: 'TH', label : '+66'},
 {value: 'TG', label : '+228'},
 {value: 'TD', label : '+235'},
 {value: 'TC', label : '+1-64'},
 {value: 'LY', label : '+218'},
 {value: 'VA', label : '+379'},
 {value: 'AE', label : '+971'},
 {value: 'AD', label : '+376'},
 {value: 'AF', label : '+93'},
 {value: 'AI', label : '+1-26'},
 {value: 'VI', label : '+1-34'},
 {value: 'IS', label : '+354'},
 {value: 'IR', label : '+98' },
 {value: 'AM', label : '+374'},
 {value: 'AL', label : '+355'},
 {value: 'AO', label : '+244'},
 {value: 'AS', label : '+1-68'},
 {value: 'AR', label : '+54'},
 {value: 'AU', label : '+61'},
 {value: 'AT', label : '+43'},
 {value: 'AW', label : '+297'},
 {value: 'IN', label : '+91'},
 {value: 'AX', label : '+358-18'},
 {value: 'AZ', label : '+994'},
 {value: 'IE', label : '+353'},
 {value: 'ID', label : '+62'},
 {value: 'UA', label : '+380'},
 {value: 'QA', label : '+974'},
 {value: 'MZ', label : '+258'}
  ]

	// changePreferredCountries() {
	// 	this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	// }

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
