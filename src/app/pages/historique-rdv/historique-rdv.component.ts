import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-historique-rdv',
  templateUrl: './historique-rdv.component.html',
  styleUrls: ['./historique-rdv.component.css']
})
export class HistoriqueRdvComponent implements OnInit {

  validateForm!: FormGroup;

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
    this.validateForm.get('statut')!.setValue(value === 'traite' ? 'traite' : 'en cours!');
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
