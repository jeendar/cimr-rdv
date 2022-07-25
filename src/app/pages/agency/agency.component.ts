import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Agence } from 'src/app/models/agence';
import { AgenceService } from 'src/app/services/agence.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

interface ItemData {
  id: number;
  nom: string;
  adresse: string;
  location: string;
}
@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {
  agencies?: Agence[];
  //agencies: Observable<Agence[]>;

  size: NzButtonSize = 'small';
  radioValue = 'A';
  validateForm!: FormGroup;
  inputValue?: string;
  displayAdd = false;
  displayEdit = false;
  displayImport = false;
  loading = false;
  
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

  constructor( private fb: FormBuilder,
               private agencyService : AgenceService,
               private msg : NzMessageService,
               private router: Router  ) {
                this.agencyForm = fb.group({
                  idagence: [null, Validators.required],
                  libelleagence: [null, Validators.required],
                  locationagence: [null],
                  adresseagence: [null, Validators.required],
                  latitude: [null],
                  longitude: [null]
                });
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
    this.loading = true;
    const requestData = this.listOfAgences.filter(data => this.setOfCheckedId.has(data.id));
    this.displayImport = false;
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false;
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);  
  }

  importAgency() {
    this.displayImport = !this.displayImport ;
    this.displayAdd = false;
    this.displayEdit = false;
  }
  
  reloadAgencies(){
    this.agencyService.getAgencesList()
    .subscribe({
      next: (data) => {
        this.agencies = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageAgences.forEach((agence, index) => this.updateCheckedSet(agence.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageAgences.forEach((agence, index) => this.updateCheckedSet(agence.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageAgences: readonly ItemData[] = [];
  listOfAgences: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked  : boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageAgences.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageAgences = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageAgences.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageAgences.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  agenceData ={};  
  onSubmit(){
    this.submitted=true;
    console.log('fblzpglzp');
    if(this.agencyForm.invalid){
      return;
    }  
    this.agenceData = this.agencyForm.value;
    this.addAggence();  
}

  addAggence(){
    console.log(this.agencyForm.value);
    this.agencyService.createAgence(this.agenceData)
    .subscribe(res =>{
      this.router.navigate(['/agency']);
    });
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
  
  
  updateAgence(): void{
    this.agencyService.updateAgence(this.currentAgence.idagence, this.currentAgence)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
  
  deleteAgency(): void {
    this.agencyService.deleteAgence(this.currentAgence.idagence)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }
   //private getAgencies(){
   //  this.agenciesList.getAgencesList.subscribe(data => {
   //   this.getAgencies = data;
   // });
   //}


  ngOnInit(): void {
    // this.getAgencies()
  //    this.reloadAgencies();
      
  }

}