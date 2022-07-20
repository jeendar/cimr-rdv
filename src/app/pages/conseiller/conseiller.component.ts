import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Conseiller } from 'src/app/models/conseiller';
import { ConseillersService } from 'src/app/services/conseiller.service';


import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

interface ItemData {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  agence: string;
}
@Component({
  selector: 'app-conseiller',
  templateUrl: './conseiller.component.html',
  styleUrls: ['./conseiller.component.css']
})
export class ConseillerComponent implements OnInit {
  size: NzButtonSize = 'large';
  conseiller?: Conseiller[];
  validateForm!: FormGroup;
  displayAdd = false;
  displayEdit = false;
  loading = false;
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
        this.listOfCurrentPageAgences.forEach((conseiller, index) => this.updateCheckedSet(conseiller.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageAgences.forEach((conseiller, index) => this.updateCheckedSet(conseiller.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageAgences: readonly ItemData[] = [];
  listOfConseillers: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  
  constructor( 

    private conseillerService: ConseillersService){}

  exportAsPDF() {  
    let docDefinition = {  
      header: 'Liste des conseillers',  
      content: 'content'  
    };  
    pdfMake.createPdf(docDefinition).open();  
  }  
  addConseiller() {
    this.displayAdd = !this.displayAdd;
    this.displayEdit = false;
  };
  editConseiller() {
    this.loading = true;
    const requestData = this.listOfConseillers.filter(data => this.setOfCheckedId.has(data.id));
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false;
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);  }
  
  updateCheckedSet(id: number, checked: boolean): void {
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
  
  loadConseillers(){
    this.conseillerService.getConseillersList()
    .subscribe({
      next: (data) => {
        this.conseiller = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
    //  this.conseillerService.updateConseiller();
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
  ngOnInit(): void {
    this.loadConseillers
    // this.listOfConseillers = new Array(3).fill(0).map((_, index) => ({
    //   id: index,
    //   matricule: `685`,
    //   nom: `NomConseiller A${index}`,
    //   prenom: `PrénomConseiller A${index}`,
    //   email: `conseiller-abcd@cimr.ma`,
    //   agence: `Agence Casablanca`
    // }));
  }
}