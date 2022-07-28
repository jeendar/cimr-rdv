import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { Conseiller } from 'src/app/models/conseiller';
import { ConseillersService } from 'src/app/services/conseiller.service';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
 
@Component({
  selector: 'app-conseiller',
  templateUrl: './conseiller.component.html',
  styleUrls: ['./conseiller.component.css']
})
export class ConseillerComponent implements OnInit {
  doc = new jsPDF();
  size: NzButtonSize = 'large';
  listConseillers?: Conseiller[];
  conseillerSelectione:Conseiller;
  validateForm!: FormGroup;
  displayEdit = false;
  checked = false;
  setOfCheckedId = new Set<number>();
  
  constructor( 

    private conseillerService: ConseillersService){}

  // exportAsPDF() {  
  //   let docDefinition = {  
  //     header: 'Liste des conseillers',  
  //     content: 'content'  
  //   };  
  //   // pdfMake.createPdf(docDefinition).open();  
  // }  
   
  editConseiller() {
    const requestData = this.listConseillers.filter(data => this.setOfCheckedId.has(data.idconseiller));
    this.displayEdit = !this.displayEdit ;
    this.conseillerSelectione=requestData[0];
    this.setOfCheckedId.clear();
    }
  
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listConseillers.forEach(item => this.updateCheckedSet(item.idconseiller , value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event:   Conseiller[]): void {
    this.listConseillers = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listConseillers.every(item => this.setOfCheckedId.has(item.idconseiller)); 
  }
  
  loadConseillers(){
    this.conseillerService.getConseillersList()
    .subscribe({
      next: (data) => {
        this.listConseillers = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  ngOnInit(): void {
    this.loadConseillers();
  }

  deleteConseiller():void{
    const requestData = this.listConseillers.filter(data => this.setOfCheckedId.has(data.idconseiller));
    this.conseillerSelectione=requestData[0];
    console.log(this.conseillerSelectione);
    this.conseillerService.deleteConseiller(this.conseillerSelectione.idconseiller)
    .subscribe({
      next: (data) => {
        this.listConseillers = data;
        console.log(data);
        this.loadConseillers();
      },
      error: (e) => console.error(e)
    });
  }
  onConsiellerEdited(isAgenceSubmited:{value:boolean}){
    if(isAgenceSubmited.value){
    this.setOfCheckedId.clear();
      this.loadConseillers();
      this.displayEdit = false;
    }
  }
  export(){
    this.doc=new jsPDF();
    autoTable(this.doc, {
      head: [['Matricule', 'Nom', 'Prenom', 'Email', 'Agence']],
      body: this.makeExportBody(),
    })
    
    this.doc.save('table.pdf')
  }
  makeExportBody():any{
    const body: string [][]=[];
      const requestData = this.listConseillers.filter(data => this.setOfCheckedId.has(data.idconseiller));
      console.log(requestData);
      requestData.forEach(consieller=>{
        body.push([consieller.matricule,consieller.nom,consieller.prenom,consieller.adressemail,consieller.agence.libelleagence]);
      })
      this.setOfCheckedId.clear();
    
    return body;

  }
  
  // this.loadConseillers(); loadusers after edit or delete or add new consieller
}