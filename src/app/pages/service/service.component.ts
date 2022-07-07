import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

interface ItemData {
  id: number;
  nom: string;
  necessiteRdv: string;
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
  // showAdd = ''
  validateForm!: FormGroup;
  inputValue?: string;
  loading = false;  
  displayAdd = false;
  displayEdit = false;
  isupdated = false;      
  servicelist: any;
  servicesArray: any[] = [];

  currentService : Service = {
    id:0,
    nom: '',
    necessiteRdv: '',
    description: ''
  };

  constructor(private fb: FormBuilder,
    private serviceService : ServiceService) {}
    
  addNewService(){}
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};

  addService() {
    this.displayAdd = !this.displayAdd;
    this.displayEdit = false;
  };
  
  updateService(): void{
    this.serviceService.updateService(this.currentService.id, this.currentService)
    .subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  deleteService(): void {
    this.serviceService.deleteService(this.currentService.id)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  editService() : void {
    this.loading = true;
    const requestData = this.listOfServices.filter(data => this.setOfCheckedId.has(data.id));
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false;    
    console.log(requestData);
    
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);  
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
        this.listOfCurrentPageServices.forEach((service, index) => this.updateCheckedSet(service.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageServices.forEach((service, index) => this.updateCheckedSet(service.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageServices: readonly ItemData[] = [];
  listOfServices: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
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
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageServices.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageServices = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageServices.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageServices.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.listOfServices = new Array(3).fill(0).map((_, index) => ({
      id: index,
      nom: `Service A${index}`,
      necessiteRdv: `Oui`,
      description: `Description du service A${index}`
    }));
  }
}