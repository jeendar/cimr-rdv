import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Rendezvous {
  ref: number;
  dateHeure: string;
  horaireDebut: string;
  horaireFin: string;
  dureeRdv: string;
  typeService: string;
  nomAllocataire: string;
  numDp: number;
  statut: string;
  agence: string;
  conseiller: string;
}

@Component({
  selector: 'app-historique-rdv',
  templateUrl: './historique-rdv.component.html',
  styleUrls: ['./historique-rdv.component.css']
})
export class HistoriqueRdvComponent implements OnInit {

  validateForm!: FormGroup;

  listOfData: Rendezvous[] = [
    {
      ref: 33272651,
      dateHeure: '23/01/2023 - 10:35',
      horaireDebut:'10:35',
      horaireFin: '11:00',
      dureeRdv: '25min',
      typeService: 'Service Type A',
      nomAllocataire: 'Allocataire A1',
      numDp: 3492122,
      statut: 'traité',
      agence: 'Agence Marrakech',
      conseiller: 'Conseiller C1'
    },{
      ref: 33272652,
      dateHeure: '02/01/2023 - 14:20',
      horaireDebut:'14:20',
      horaireFin: '14:50',
      dureeRdv: '30min',
      typeService: 'Service Type C',
      nomAllocataire: 'Allocataire A5',
      numDp: 3442135,
      statut: 'En cours',
      agence: 'Agence Oujda',
      conseiller: 'Conseiller C6'
    },{
      ref: 33272653,
      dateHeure: '03/01/2023 - 09:20',
      horaireDebut:'09:20',
      horaireFin: '11:00',
      dureeRdv: '40min',
      typeService: 'Service Type D',
      nomAllocataire: 'Allocataire A2',
      numDp: 3452012,
      statut: 'En cours',
      agence: 'Agence Casablanca',
      conseiller: 'Conseiller C3'
    }
  ];

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control  => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  statutChange(value: string): void {
    this.validateForm.get('statut')!.setValue(value);
  }

  constructor(private fb: FormBuilder) {}

  dateFormat = 'yyyy/MM/dd';
  monthFormat = 'yyyy/MM';

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      numDP: ['', [Validators.required]],
      identitytype: ['', [Validators.required]],
      agency: ['', [Validators.required]],
      conseiller: ['', [Validators.required]],
      allocataire: ['', [Validators.required]],
      statut: ['', [Validators.required]],
      dateFrom: [null],
      dateTo: [null]
    });
    
  }
}
