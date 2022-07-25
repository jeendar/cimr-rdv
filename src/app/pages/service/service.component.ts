import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Service } from 'src/app/models/service';
import { ServiceService } from 'src/app/services/service.service';

 
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  size: NzButtonSize = 'large';
  radioValue = 'A';
  validateForm!: FormGroup;
  inputValue?: string;
  loading = false;  
  displayAdd = false;
  displayEdit = false;
  isupdated = false;      
  servicelist: any;
  servicesArray: any[] = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageServices: readonly Service[] = [];
  listOfServices: Service[] = [];
  setOfCheckedId = new Set<number>();

  currentService : Service = {
    id:0,
    nom: '',
    necessiteRdv: '',
    description: ''
  };

  constructor(private fb: FormBuilder,
    private serviceService : ServiceService) {}
    
   
  editCache: { [key: string]: { edit: boolean; data: Service } } = {};

  addService() {
    this.setOfCheckedId.clear();
    this.displayAdd = !this.displayAdd;
    this.displayEdit = false;
    this.currentService=new Service();
  };
  deleteService(): void {
    this.displayEdit = false ;
    this.displayAdd = false;  
    this.serviceService.deleteService(this.currentService.id)
      .subscribe(
        response => {
          console.log(response);
          this.serviceService.getServicesList().subscribe(
            (data:Service[])=>{ this.listOfServices = data;}
          );
        },
        error => {
          console.log(error);
        });
  }

  editService() : void {
    this.displayAdd = false; 
    this.displayEdit = true ;
    this.loading = true;
    const requestData = this.listOfServices.filter(data => this.setOfCheckedId.has(data.id));
    
  } 
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
    const requestData = this.listOfServices.filter(data => this.setOfCheckedId.has(data.id));  
    console.log(requestData);
    this.currentService=requestData[0];
    console.log("onItemChecked");
  }

  onCurrentPageDataChange($event: readonly Service[]): void {
    this.listOfCurrentPageServices = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageServices.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageServices.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  ngOnInit(): void {
    this.serviceService.getServicesList().subscribe(
      (data:Service[])=>{ this.listOfServices = data;}
    );
  }
  onServiceEditedorAdded(isServiceSubmitted:{value:boolean}) {
    if(isServiceSubmitted.value){
      this.displayAdd=false;
      this.displayEdit=false;
    }else{
      // show error message
    }
    
  }
}