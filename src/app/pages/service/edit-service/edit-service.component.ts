import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class EditServiceComponent implements OnInit {
    
    @Input() requestData = '';
    
    validateForm!: FormGroup;
   
   constructor(private fb: FormBuilder,
              private servicesService : ServiceService) {}
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
  