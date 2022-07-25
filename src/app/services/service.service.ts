import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Service } from '../models/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  //private baseURL = "http://172.20.10.3:8080/api/gestionrdv/ajouterservice";
  private baseURL = "http://172.20.10.3:8080/api/gestionrdv/";
  constructor(private httpClient: HttpClient) { }

  getServicesList(): Observable<Service[]>{
    
     //return this.httpClient.get<Service[]>(`${this.baseURL}`.concat('getServices'));
    return of(new Array(3).fill(0).map((_, index) => ({
      id: index,
      nom: `Service A${index}`,
      necessiteRdv: `oui`,
      description: `Description du service A${index}`
    })));
  } 

  createService(service: any): Observable<Object>{
      return this.httpClient.post(`${this.baseURL}`, service);
  }

  getServiceById(id: number): Observable<Service>{
    return this.httpClient.get<Service>(`${this.baseURL}/${id}`);
  }

  updateService(id: number, service: Service): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, service);
  }

  deleteService(id:number):Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
  
}
