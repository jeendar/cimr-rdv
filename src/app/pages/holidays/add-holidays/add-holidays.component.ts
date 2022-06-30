import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { differenceInBusinessDays, eachWeekendOfYear, setHours } from 'date-fns';
import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';
import { Agence } from 'src/app/agence';
import { AgenceService } from 'src/app/services/agence.service';
import { Holidays } from 'src/app/services/holidays';
import { HolidaysService } from 'src/app/services/holidays.service';

@Component({
  selector: 'app-add-holidays',
  templateUrl: './add-holidays.component.html',
  styleUrls: ['./../holidays.component.css']
})
export class AddHolidaysComponent implements OnInit {
  validateForm!: FormGroup;

  holiday: Holidays = {
    name:'',
    dateDebut: '',
    dateFin: '',
  };
  submitted = false;
  isVisible = false;
  isOkLoading = false;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  constructor(private fb: FormBuilder,
              private holidaysService : HolidaysService) {
  }

  saveAgency():void{
    const data = {
      id: this.holiday.holiday_id,
      address: this.holiday.name,
      debut: this.holiday.dateDebut,
      fin: this.holiday.dateFin,
    };
    this.holidaysService.createHoliday(data)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.submitted = true;
        },
        error : (e) => console.error(e)
      });
  }
  newHoliday():void{
      this.submitted = false;
      this.holiday ={
        name: '',
        dateDebut:'',
        dateFin:'',
      }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      libelleagence: [null, [Validators.required]],
      adresseagence: [null, [Validators.required]],
      locationagence: [null, [Validators.required]]
    });
  }
}