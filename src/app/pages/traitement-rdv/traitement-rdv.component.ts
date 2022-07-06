import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Rendezvous {
  ref: number;
  numDp: number;
  allocataire: string;
  serviceType: string;
}

@Component({
  selector: 'app-traitement-rdv',
  templateUrl: './traitement-rdv.component.html',
  styleUrls: ['./traitement-rdv.component.css']
})
export class TraitementRdvComponent implements OnInit {
  validateForm!: FormGroup;
  isVisible = false;

  listOfData: Rendezvous[] = [
    {
      ref: 33272651,
      numDp: 3492122,
      allocataire: 'Ismail Aitali',
      serviceType: 'Type A '
    },{
      ref: 33272665,
      numDp: 862192,
      allocataire: 'Samia Ouhadi',
      serviceType: 'Type B'
    },{
      ref: 36327224,
      numDp: 32,
      allocataire: 'Zouhair EZZAAR',
      serviceType: 'Type C'
    }
  ];

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      ref: [null, [Validators.required]],
      tel: [null, [Validators.required]]
    });
  }
}