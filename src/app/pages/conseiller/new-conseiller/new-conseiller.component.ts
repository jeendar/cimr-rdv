import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Conseiller } from 'src/app/models/conseiller';
import { ConseillersService } from 'src/app/services/conseiller.service';

interface ItemData {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  agence: string;
}
@Component({
  selector: 'app-new-conseiller',
  templateUrl: './new-conseiller.component.html',
  styleUrls: ['./../conseiller.component.css']
})
export class NewConseillerComponent implements OnInit {
  validateForm!: FormGroup;

  conseiller: Conseiller = {
    idconseiller:0,
    adressemail: '',
    nom: '',
    prenom: '',
    idagence: '',
  };

  value?: string;
  
  submitted = false;
  isVisible = false;
  isOkLoading = false;

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
              private conseillerService : ConseillersService,
              private router: Router) {
      this.validateForm = fb.group({
      id: [null, Validators.required],
      email: [null, Validators.required],
      matricule: [null, Validators.required],
      nom: [null, Validators.required],
      prenom: [null, Validators.required],
      agence: [null, Validators.required],
    });
  }
  // addConseiller():void{
    // const data = {
    //   id: this.conseiller.idconseiller,
    //   email: this.conseiller.adressemail,
    //   matricule: this.conseiller.matricule,
    //   nom: this.conseiller.nom,
    //   prenom: this.conseiller.prenom,
    //   agence: this.conseiller.idagence,
    // };
  //   this.conseillerService.createConseiller(data)
  //     .subscribe({
  //       next:(res) => {
  //         console.log(res);
  //         this.submitted = true;
  //       },
  //       error : (e) => console.error(e)
  //     });
  // }
  newAgence():void{
      this.submitted = false;
      this.conseiller ={
        idconseiller: 0,
        adressemail: '',
        matricule: '',
        nom: '',
        prenom: '',
        idagence:'',
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

  ngOnInit(){}
  addConseiller(){
    this.conseillerService
      .createConseiller(this.validateForm.value)
      .subscribe((data: {}) => {
        this.router.navigate(['/conseillers']);
      });
  }  
  // ngOnInit(): void {
  //   this.validateForm = this.fb.group({
  //     matricule: [null, [Validators.required]],
  //     prenom: [null, [Validators.required]],
  //     nom: [null, [Validators.required]],
  //     agence: [null, [Validators.required]],
  //     email: [null, [Validators.required]]
  //   });
  // }
}