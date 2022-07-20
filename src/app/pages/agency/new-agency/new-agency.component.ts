import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
              private agenceService : AgenceService,
              private router: Router) {
                this.validateForm = fb.group({
                  idagence: [null, Validators.required],
                  libelleagence: [null, Validators.required],
                  locationagence: [null, Validators.required],
                  adresseagence: [null, Validators.required],
                  latitude: [null, Validators.required],
                  longitude: [null, Validators.required],
              });
            }
  
  saveAgency():void{
    
  //   this.agenceService
  //     .createAgence(this.validateForm.value)
  //     .subscribe((data: {}) => {
  //       this.router.navigate(['/agences']);
    this.agenceService.createAgence(this.validateForm.value)
      .subscribe({
        next:(res) => {
          console.log(res);
          this.submitted = true;
          
        },
        error : (e) => console.error(e)
      });
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

  // ngOnInit(){}
  // saveAgency(){
  //   this.agenceService
  //     .createAgence(this.validateForm.value)
  //     .subscribe((data: {}) => {
  //       this.router.navigate(['/agences']);
  //     });
  // }  

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
/*
  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      options: { animation: google.maps.Animation.BOUNCE },
    })
  }
*/
}