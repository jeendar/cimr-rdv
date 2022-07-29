import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Rendezvous } from 'src/app/models/rendezvous';
import { RdvService } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-rsv-recap',
  templateUrl: './rsv-recap.component.html',
  styleUrls: ['./rsv-recap.component.css']
})
export class RsvRecapComponent implements OnInit {
  //@Output() isRdvCreated = new EventEmitter<{ value: boolean }>();
  //@Input() newRdvData: Rendezvous ;
  @Input() inputFromParent : string;
  
  newRdv = [
    {
      title: 'Numéro de DP',
      data: '222222',
    },{
      title: 'Nom',
      data:'AITALI'
    },{
      title: 'Prénom',
      data:'Ismail'
    },{
      title: 'Adresse',
      data:'100 Bd Abdelmoumen, Casablanca 20250'
    },{
      title: 'Numéro de téléphone',
      data:'+21284738291'
    },{
      title: 'Agence',
      data:'Casablanca'
    },{
      title: 'Type de service',
      data:'SERVICE A'
    },{
      title: 'Date et Heure du rendez-vous ',
      data:'08/10/2022 à 10:35:00'
    }
  ];
  constructor( private rdvService : RdvService ) { }

  ngOnInit(): void {
    console.log(this.inputFromParent)
  }
  
}
