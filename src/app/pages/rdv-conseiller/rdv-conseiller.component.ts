import { Component, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

interface ItemData {
  matricule: number;
  nom: string;
  prenom: string;
  agence: string;
}

@Component({
  selector: 'app-rdv-conseiller',
  templateUrl: './rdv-conseiller.component.html',
  styleUrls: ['./rdv-conseiller.component.css']
})
export class RdvConseillerComponent implements OnInit {
  size: NzButtonSize = 'large';
  radioValue = 'A';

  listOfSelection = [
    
  ];
  checked = false;
  indeterminate = false;
  listOfCurrentPageAgences: readonly ItemData[] = [];
  listOfServices: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();


  ngOnInit(): void {
    this.listOfServices = new Array(3).fill(0).map((_, index) => ({
      matricule: 364 +index,
      nom: `Nom conseiller ${index}`,
      prenom: `Prénom Conseiller ${index}`,
      agence: `Agence Conseiller ${index}`,

    }));
  }
}