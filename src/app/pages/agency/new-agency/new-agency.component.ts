import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agence } from 'src/app/models/agence';
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
    longitude: 0,
    latitude:0,
  };
  submitted = false;
  isVisible = false;
  isOkLoading = false;


  center? : google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
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
        latitude:0,
        longitude:0,
      }
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      libelleagence: [null, [Validators.required]],
      adresseagence: [null, [Validators.required]],
      locationagence: [null, [Validators.required]]
    });
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
}