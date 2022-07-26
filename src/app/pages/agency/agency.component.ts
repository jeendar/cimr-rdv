import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Agence } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  agencies?: Agence[];
  size: NzButtonSize = 'small';
  displayAdd = false;
  displayEdit = false;
  displayImport = false;
  checked = false;
  setOfCheckedId = new Set<number>();
  
  currentAgence : Agence = {
    idagence:0,
    libelleagence: '',
    adresseagence: '',
    locationagence: '',
    latitude: 0,
    longitude: 0,
  };

  public agencyForm!: FormGroup;
  
  /*maps*/
  submitted = false;
  isVisible = false;

  center? : google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }

  constructor(private agencyService : AgenceService,private msg : NzMessageService) {
              }

  handleChange({ file, fileList }: NzUploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
    }
  }
 addAgency() {
    this.displayAdd = !this.displayAdd;
    this.displayEdit = false;
    this.displayImport = false;
  };
  editAgency() {
    const requestData = this.agencies.filter(data => this.setOfCheckedId.has(data.idagence));
    this.currentAgence=requestData[0];
    this.displayImport = false;
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false; 
  }

  importAgency() {
    this.displayImport = !this.displayImport ;
    this.displayAdd = false;
    this.displayEdit = false;
  }

  updateCheckedSet(id: number, checked  : boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    
  }
  addAggence(){
    this.agencyService.createAgence(this.agencyForm.value)
    .subscribe({
      next: () => {this.getAgencies();},
        error:(error) => { console.log(error);  }
        });
  }
  
  updateAgence(): void{
    this.agencyService.updateAgence( this.currentAgence)
    .subscribe({
      next: () => {this.getAgencies();},
        error:(error) => { console.log(error);  }
        });
  }
  
  deleteAgency(): void {
    const requestData = this.agencies.filter(data => this.setOfCheckedId.has(data.idagence));
    this.currentAgence=requestData[0];
    this.agencyService.deleteAgence(this.currentAgence.idagence)
      .subscribe({
        next: () => {
          this.getAgencies();
        },
        error:(error) => {
           console.log(error);  }
          }
        );
  }
  getAgencies(){
     this.agencyService.getAgencesList().subscribe(
      {
        next: (data) => {this.agencies= data;},
        error:(error) => { console.log(error);  }
      }  
    );
   }


  ngOnInit(): void {
     this.getAgencies()
      
  }
  onAgenceEditedOrAdded(isAgenceSubmited:{value:boolean}){
    console.log(isAgenceSubmited.value)
    if(isAgenceSubmited.value){
      this.displayAdd = false;
    this.displayEdit = false;
    this.setOfCheckedId.clear();
      this.getAgencies();
    }
  }
}