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
        this.currentConseiller.adressemail=this.validateForm.value.email;
        const currentAgency=this.agencesList.filter(a=>a.idagence==this.validateForm.value.agence);
        this.currentConseiller.agence=currentAgency[0];
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

    console.log("list des agences: ");
    console.log(this.agencesList);
    
    if(this.isNew){
      this.currentConseiller=null;
      this.currentConseiller.agence=new Agence();      
    }
    this.validateForm = new FormGroup({
      matricule: new FormControl({value:this.currentConseiller.matricule,disabled: !this.isNew}, [Validators.required]),
      prenom: new FormControl({value:this.currentConseiller.prenom,disabled: !this.isNew}, [Validators.required]),
      nom: new FormControl({value:this.currentConseiller.nom,disabled: !this.isNew}, [Validators.required]),
      agence: new FormControl(this.currentConseiller.agence.idagence, [Validators.required]),
      email: new FormControl(this.currentConseiller.adressemail, [Validators.required])
    });
  }
  cancel(){
    this.emitEvent.emit({value:true});
  }

  compareFn = (o1: any, o2: any) => (o1 && o2 ? o1.idagence === o2.idagence : o1 === o2);


}