import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { Agence } from 'src/app/agence';
import { AgenceService } from 'src/app/services/agence.service';

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

  size: NzButtonSize = 'small';
  radioValue = 'A';
  validateForm!: FormGroup;
  inputValue?: string;
  displayAdd = false;
  displayEdit = false;
  displayImport = false;
  
  constructor( private fb: FormBuilder,
               private agencyService : AgenceService  ) {}

 addAgency() {
    this.displayAdd = !this.displayAdd;
    this.displayEdit = false;
    this.displayImport = false;
  };
  editAgency() {
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false;
    this.displayImport = false;
  };
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
   //private getAgencies(){
   //  this.agenciesList.getAgencesList.subscribe(data => {
   //   this.getAgencies = data;
   // });
   //}


  ngOnInit(): void {
    // this.getAgencies()
      this.reloadAgencies();

    // this.listOfAgences = new Array(3).fill(0).map((_, index) => ({
    //   id: index,
    //   nom: `Agence Numéro ${index}`,
    //   adresse: `100 Bd Abdelmoumen, Casablanca 20250`,
    //   location: `https://url-de-geolocalisation.maps/`
    // }));
   // this.listOfAgences = new Array(getagencie)
  }

}