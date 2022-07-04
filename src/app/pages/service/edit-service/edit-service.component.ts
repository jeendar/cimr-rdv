import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class EditServiceComponent implements OnInit {

    validateForm!: FormGroup;
   
   constructor(private fb: FormBuilder) {}
    ngOnInit(): void {
    }
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
  }
  