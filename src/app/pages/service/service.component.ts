import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  serviceList: any;
  servicesArray: any[] = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageServices: readonly Service[] = [];
  listOfServices: Service[] = [];
  setOfCheckedId = new Set<number>();

  currentService : Service = {
    idservice:0,
    typeservice: '',
    necessiterdv: '',
    description: ''
  };

  constructor(private fb: FormBuilder,
    private serviceService : ServiceService) {}
    
   
  editCache: { [key: string]: { edit: boolean; data: Service } } = {};

  addService() {
    if(!this.displayEdit){
      this.displayAdd = !this.displayAdd;
    }
    
  };
  deleteService(): void {
    this.displayEdit = false ;
    this.displayAdd = false;  
    this.serviceService.deleteService(this.currentService.idservice)
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
    const requestData = this.listOfServices.filter(data => this.setOfCheckedId.has(data.idservice));
    this.currentService=requestData[0];
    
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
    const requestData = this.listOfServices.filter(data => this.setOfCheckedId.has(data.idservice));  
    this.currentService=requestData[0];
  }

  onCurrentPageDataChange($event: readonly Service[]): void {
    this.listOfCurrentPageServices = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageServices.every(item => this.setOfCheckedId.has(item.idservice));
    this.indeterminate = this.listOfCurrentPageServices.some(item => this.setOfCheckedId.has(item.idservice)) && !this.checked;
  }

  ngOnInit(): void {
    this.refreshData();
  }
  onServiceEditedorAdded(isServiceSubmitted:{value:boolean}) {
    if(isServiceSubmitted.value){
      this.displayAdd=false;
      this.displayEdit=false;
      this.refreshData();
    }else{
      // show error message
    }
  }
  refreshData(){
    this.serviceService.getServicesList().subscribe(
      (data:Service[])=>{ 
        this.listOfServices = data;
      }
    );
  }
}