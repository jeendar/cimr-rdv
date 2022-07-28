import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Agence } from 'src/app/models/agence';
import { Conseiller } from 'src/app/models/conseiller';
import { AgenceService } from 'src/app/services/agence.service';
import { ConseillersService } from 'src/app/services/conseiller.service';

@Component({
  selector: 'app-new-conseiller',
  templateUrl: './new-conseiller.component.html',
  styleUrls: ['./../conseiller.component.css']
})
export class NewConseillerComponent implements OnInit {
  validateForm!: FormGroup;
  @Input() currentConseiller:Conseiller;
  @Input() isNew=true;
  @Output() emitEvent=new EventEmitter<{value:boolean}>();
  agencesList:Agence[];
  value?: string;
  
  submitted = false;
  isVisible = false;
  isOkLoading = false;

  submitForm(): void {
    
    if (this.validateForm.valid) {
      if(this.isNew){
        this.conseillerService.createConseiller(this.validateForm.value).
      subscribe({
        next:()=>{
        this.emitEvent.emit({value:true})
      },
        error:(error)=>{
          this.emitEvent.emit({value:false})
          console.log(error);}
      } )
      }else{
        this.conseillerService.updateConseiller(this.validateForm.value).
        subscribe({
          next:()=>{
          this.emitEvent.emit({value:true})
        },
          error:(error)=>{
            this.emitEvent.emit({value:false})
            console.log(error);}
        } )
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
  constructor(private agenceService:AgenceService,
              private conseillerService : ConseillersService ) {
      
  }
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    
    this.agenceService.getAgencesList().subscribe(
      {
        next: (data) => {this.agencesList= data;},
        error:(error) => { console.log(error);  }
      }  
    );
    if(this.isNew){
      this.currentConseiller=new Conseiller();
      this.currentConseiller.agence=new Agence();
      console.log(" this.currentConseiller in case of add new conseiller  ");
      console.log(this.currentConseiller);
      
    }
    this.validateForm = new FormGroup({
      matricule: new FormControl(this.currentConseiller.matricule, [Validators.required]),
      prenom: new FormControl(this.currentConseiller.prenom, [Validators.required]),
      nom: new FormControl(this.currentConseiller.nom, [Validators.required]),
      agence: new FormControl(this.currentConseiller.agence.idagence, [Validators.required]),
      email: new FormControl(this.currentConseiller.adressemail, [Validators.required])
    });
  }
  cancel(){
    this.emitEvent.emit({value:true});
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.role_id === o2.role_id : o1 === o2);


}