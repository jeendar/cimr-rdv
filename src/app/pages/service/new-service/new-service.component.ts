import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class NewServiceComponent implements OnInit {

  validateForm!: FormGroup;
  @Output() newItemEvent = new EventEmitter<string>();

 constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
  }

  addNewService(value: string){
    this.newItemEvent.emit(value);
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
     
        }
      });
    }
  }
}
