import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workinghours',
  templateUrl: './workinghours.component.html',
  styleUrls: ['./workinghours.component.css']
})
export class WorkinghoursComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      console.log("non valide");
      Object.values(this.validateForm.controls).forEach(
        control  => {
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

  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';
  
  ngOnInit(): void {
    this.validateForm = new FormGroup({
      effectiveTime: new FormControl('',[Validators.required]),
      rdvTime: new FormControl('', [Validators.required]),
      nombreConseillers:new FormControl( {value:'',disabled:true},[Validators.required]),
      dateFrom: new FormControl('',[Validators.required]),
      dateTo:new FormControl( '',[Validators.required])
    });
  }
}
