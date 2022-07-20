import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class NewServiceComponent implements OnInit {

  //@Output() newItemEvent = new EventEmitter<string>();

  // addNewService(value: string){
  //   this.newItemEvent.emit(value);
  // }
  validateForm!: FormGroup;

  srvc: Service = new Service();
  submitted = false;
 constructor(private fb: FormBuilder,
              private service: ServiceService,
              private router: Router) {

    this.validateForm = this.fb.group({
      id:['', [Validators.required]],
      nom:['', [Validators.required]],
      necessiteRdv:['', [Validators.required]],
      description:['', [Validators.required]]
    })
 }
  ngOnInit(): void {
  }
  
  save() {
    this.service
    .createService(this.srvc).subscribe(data => {
      console.log(data)
      this.srvc = new Service();
    }, 
    error => console.log(error));
  }
  

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.submitted = true;
      this.save(); 
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
    }
  }
  
  // submitForm(): void {
  //   for (const i in this.validateForm.controls) {
  //     if (this.validateForm.controls.hasOwnProperty(i)) {
  //       this.validateForm.controls[i].markAsDirty();
  //       this.validateForm.controls[i].updateValueAndValidity();
  //     }
  //   }
  // }
}
