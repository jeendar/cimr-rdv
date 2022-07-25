import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class EditServiceComponent implements OnInit {
    
   // @Input() requestData = '';
    id!: number;
    service!: Service;
    
    validateForm!: FormGroup;
   
   constructor(private fb: FormBuilder,
              private route : ActivatedRoute,
              private servicesService : ServiceService) {}


    ngOnInit(): void {
      this.service = new Service();

      this.id = this.route.snapshot.params['id'];
      this.servicesService.getServiceById(this.id)
      .subscribe(data => {
        console.log(data)
        this.service = data;
      }, error => console.log(error));
    }

    updateService() {
      this.servicesService.updateService(this.id, this.service)
        .subscribe(data => {
          console.log(data);
          this.service = new Service();
        }, error => console.log(error));
    }
    
    submitForm(): void {
      if (this.validateForm.valid) {
        this.updateService();
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
  