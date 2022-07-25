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
 constructor(private fb: FormBuilder,
  private serviceService : ServiceService) {
    
  }
  ngOnInit() : void{
    if(this.isNew){
      this.editService=new Service();
    }
    console.log( this.editService);
    this.validateForm = new FormGroup({
      service: new FormControl(this.editService.nom, [Validators.required]),
      description: new FormControl(this.editService.description, [Validators.required]),
      necessiteRdv: new FormControl(this.editService.necessiteRdv, [Validators.required])

    });
  }
  

  submitForm(): void {
    if (this.validateForm.valid) {
      let currentService: Service;
       currentService=new Service();
      currentService={'description':this.validateForm.value.description,'necessiteRdv':this.validateForm.value.necessiteRdv,'nom':this.validateForm.value.service};
      console.log(currentService);
      if(this.isNew){
        this.serviceService.createService(currentService)
        .subscribe({
          next :()=> {
            console.log('response');
            this.isServiceCreated.emit({value:true});
          },
          error :()=>{
            this.isServiceCreated.emit({value:false});
            console.log('error');}
          });
      }else{
        this.serviceService.updateService(currentService.id,currentService)
        .subscribe({
          next :()=> {
            this.isServiceCreated.emit({value:true});
            console.log('response');},
          error :()=>{
            this.isServiceCreated.emit({value:false});
            console.log('error');}
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
