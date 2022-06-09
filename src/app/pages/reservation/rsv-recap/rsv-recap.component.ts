import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsv-recap',
  templateUrl: './rsv-recap.component.html',
  styleUrls: ['./rsv-recap.component.css']
})
export class RsvRecapComponent implements OnInit {

  data = [
    {
      title: 'Numéro de DP',
      data:'28376464634'
    },{
      title: 'Nom',
      data:'AITALI'
    },{
      title: 'Prénom',
      data:'Ismail'
    },{
      title: 'Adresse',
      data:'40, Rue ELkadi Ayad, Casablanca'
    },{
      title: 'Numéro de téléphone',
      data:'+21284738291'
    },{
      title: 'Agence',
      data:'Abdelmoumen'
    },{
      title: 'Type de service',
      data:'SERVICE 1'
    },{
      title: 'Date et Heure du rendez-vous ',
      data:'08/10/2022 à 10:35:00'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
}
