import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agence } from 'src/app/agence';
import { AgenceService } from 'src/app/services/agence.service';

@Component({
  selector: 'app-new-agency',
  templateUrl: './new-agency.component.html',
  styleUrls: ['./../agency.component.css']
})
export class NewAgencyComponent implements OnInit {
  validateForm!: FormGroup;

  agence: Agence = {
    idagence: '',
    libelleagence: '',
    adresseagence: '',
    locationagence: '',
  };
  submitted = false;
  isVisible = false;

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
  constructor(private fb: FormBuilder,
              private agenceService : AgenceService) {
  }
  saveAgency():void{
    const data = {
      label: this.agence.libelleagence,
      address: this.agence.locationagence,
      location: this.agence.locationagence,
    };
    this.agenceService.createAgence(data)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.submitted = true;
        },
        error : (e) => console.error(e)
      });
  }
  newAgence():void{
      this.submitted = false;
      this.agence ={
        libelleagence: '',
        adresseagence: '',
        locationagence:'',
      }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      libelleagence: [null, [Validators.required]],
      adresseagence: [null, [Validators.required]],
      locationagence: [null, [Validators.required]]
    });
  }
}