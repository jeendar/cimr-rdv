import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Holidays } from 'src/app/models/holidays';
import { HolidaysService } from 'src/app/services/holidays.service';

interface ItemData {
  holiday_id: number;
  name: string;
  dateDebut: string;
  dateFin: string;
}
@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {
  holidays?: Holidays[];
  
  displayAdd = false;
  displayEdit = false;
  displayImport = false;

  filename!: String;
  nzAction = 'http://localhost:8080/api/gestionrdv/holidays/upload/?';
  size: NzButtonSize = 'small';
  radioValue = 'A';
  
  validateForm!: FormGroup;
  inputValue?: string;
  
  constructor(private fb: FormBuilder,
              private holidaysService : HolidaysService,
              private msg : NzMessageService){}
                
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
  addHoliday() {
    this.displayAdd = !this.displayAdd;
    this.displayImport = false;
    this.displayEdit = false;
  };
  editHoliday() {
    this.displayEdit = !this.displayEdit ;
    this.displayAdd = false;
    this.displayImport = false;
  }
  importHoliday() {
    this.displayImport = !this.displayImport ;
    this.displayAdd = false;
    this.displayEdit = false;
  }
  reloadAgencies(){
    this.holidaysService.getHolidaysList()
    .subscribe({
      next: (data) => {
        this.holidays = data;
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
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.holiday_id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.holiday_id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];
  
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
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
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.holiday_id, value));
    this.refreshCheckedStatus();

  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.holiday_id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.holiday_id)) && !this.checked;
  }


  reloadHolidays(){
    this.holidaysService.getHolidaysList()
    .subscribe({
      next: (data) => {
        this.holidays = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  ngOnInit(): void {
    this.listOfData = new Array(3).fill(0).map((_, index) => ({
      holiday_id: index,
      name: `Fête de travail ${index}`,
      dateDebut: `2022-08-1${index}`,
      dateFin: `2022-08-1${index+1}`

    }));
  }
}