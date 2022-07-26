import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Agence } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';


@Component({
  selector: 'app-new-agency',
  templateUrl: './new-agency.component.html',
  styleUrls: ['./../agency.component.css']
})
export class NewAgencyComponent implements OnInit{
  agencyForm!: FormGroup;
  @Input() isNew=false;
  @Input() editedAgency:Agence;
  @Output() emitEvent=new EventEmitter<{value:boolean}>();
  
  /*maps*/
  submitted = false;
  isVisible = false;
  isOkLoading = false;
  center? : google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  agenceData =  {}

  constructor(private agenceService : AgenceService) { 
  }

  addAgence(){
    this.agenceService.createAgence(this.agencyForm.value)
    .subscribe(
      {
        next:()=>{console.log('success');
        this.emitEvent.emit({value:true})
      },
        error:()=>{
          this.emitEvent.emit({value:false})
          console.log('error');}
      } 
    );
  }
  editAgence(){
    this.agenceService.updateAgence(this.agencyForm.value)
    .subscribe(
      {
        next:()=>{
          this.emitEvent.emit({value:true})
          console.log('success');},
        error:()=>{
          this.emitEvent.emit({value:false})
          console.log('editAgence error');}
      } 
    );
  }

   onSubmit() {
     if (this.agencyForm.valid) {
      if(this.isNew){
        this. addAgence();
      }else{
        this.editAgence();
      }
       
     } else {
       Object.values(this.agencyForm.controls).forEach(control => {
         if (control.invalid) {
           control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
         }
       });
     }
  }
  ngOnInit(): void {
      if(this.isNew){
          this.editedAgency=new Agence();
      }
    this.agencyForm = new FormGroup({
      libelleagence: new FormControl(this.editedAgency.libelleagence,[ Validators.required]),
      locationagence: new FormControl(this.editedAgency.locationagence,[]),
      adresseagence: new FormControl(this.editedAgency.adresseagence,[ Validators.required]),
      latitude: new FormControl(this.editedAgency.latitude,[Validators.required]),
      longitude: new FormControl(this.editedAgency.longitude,[Validators.required])
  });
  }
}
