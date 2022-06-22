import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: number;
  matricule: string;
  nom: string;
  prenom: string;
  email: string;
  agence: string;
}
@Component({
  selector: 'app-edit-conseiller',
  templateUrl: './edit-conseiller.component.html',
  styleUrls: ['./../conseiller.component.css']
})
export class EditconseillerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
