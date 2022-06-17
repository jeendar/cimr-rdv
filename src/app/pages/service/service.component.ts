import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

interface ItemData {
  id: number;
  nom: string;
  description: string;
}
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {
  size: NzButtonSize = 'large';
  radioValue = 'A';

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
  listOfServices: readonly ItemData[] = [];
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
    this.listOfServices = new Array(3).fill(0).map((_, index) => ({
      id: index,
      nom: `Service A${index}`,
      description: `Description du service A${index}`
    }));
  }
}