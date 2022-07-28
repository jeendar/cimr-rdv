import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators  } from '@angular/forms';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-new-service',
  templateUrl: './new-service.component.html',
  styleUrls: ['./../service.component.css']
})
export class NewServiceComponent implements OnInit {
  @Input() isNew=true;
  @Input() editService:Service;
  @Output() isServiceCreated = new EventEmitter<{ value: boolean }>();
  validateForm!: FormGroup;
 constructor(
  private serviceService : ServiceService) {
    
  }
  ngOnInit() : void{
    if(this.isNew){
      this.editService=new Service();
    }
    console.log( this.editService);
    this.validateForm = new FormGroup({
      typeservice: new FormControl(this.editService.typeservice, [Validators.required]),
      description: new FormControl(this.editService.description, [Validators.required]),
      necessiterdv: new FormControl(this.editService.necessiterdv, [Validators.required])

    });
  }
  

  submitForm(): void {
    if (this.validateForm.valid) {
      let currentService: Service;
      currentService=new Service();
      currentService={'description':this.validateForm.value.description,'necessiterdv':this.validateForm.value.necessiterdv,'typeservice':this.validateForm.value.typeservice};
      console.log(currentService);
      if(this.isNew){
        this.serviceService.createService(currentService)
        .subscribe({
          next :()=> {
            
            this.isServiceCreated.emit({value:true});
          },
          error :()=>{
            this.isServiceCreated.emit({value:false});
            }
          });
      }else{
        this.serviceService.updateService(this.editService)
        .subscribe({
          next :()=> {
            this.isServiceCreated.emit({value:true});
            },
          error :()=>{
            this.isServiceCreated.emit({value:false});
            }
          });
      }
     
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
