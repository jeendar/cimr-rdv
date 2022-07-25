import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../models/service';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //private baseURL = "http://172.20.10.3:8080/api/gestionrdv/ajouterservice";
  private baseURL = "http://192.168.111.118:8080/Gestion_RDV/api/gestionrdv/";
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Credentials':'false'} )
    ,    withCredentials: false
  };

  getServicesList(): Observable<Service[]>{
    
     return this.httpClient.get<Service[]>(`${this.baseURL}`.concat('getServices'));
    /*return of(new Array(3).fill(0).map((_, index) => ({
      id: index,
      nom: `Service A${index}`,
      necessiteRdv: `oui`,
      description: `Description du service A${index}`
    })));*/
  } 

  createService(service: any): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}`.concat('addService'), service,this.httpOptions);
  }

  getServiceById(id: number): Observable<Service>{
    return this.httpClient.get<Service>(`${this.baseURL}/${id}`);
  }

  updateService( service: Service): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`.concat('updateService'), service,this.httpOptions);
  }

  deleteService(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}`.concat('deleteServiceById/').concat(`${id}`));
  }
  
}
