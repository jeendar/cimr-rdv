import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

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

  ngOnInit(): void {
    this.listOfConseillers = new Array(3).fill(0).map((_, index) => ({
      id: index,
      matricule: `685`,
      nom: `NomConseiller A${index}`,
      prenom: `PrénomConseiller A${index}`,
      email: `conseiller-abcd@cimr.ma`,
      agence: `121, Abdelmoumen, Casablanca`
    }));
  }
}