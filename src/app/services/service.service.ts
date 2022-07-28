import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'} )
    ,    withCredentials: false
  };

  getServicesList(): Observable<Service[]>{
     //return this.httpClient.get<Service[]>(environment.baseUrl.concat('getServices'),this.httpOptions);
    return of(new Array(3).fill(0).map((_, index) => ({
      idservice: index,
      typeservice: `Service A${index}`,
      necessiterdv: `oui`,
      description: `Description du service A${index}`
    })));
  } 

  createService(service: Service): Observable<Object>{
      return this.httpClient.post(environment.baseUrl.concat('addService'), service,this.httpOptions);
  }

  getServiceById(id: number): Observable<Service>{
    return this.httpClient.get<Service>(`${environment.baseUrl}/${id}`);
  }

  updateService( service: Service): Observable<Object>{
    return this.httpClient.put(environment.baseUrl.concat('updateService'), service,this.httpOptions);
  }

  deleteService(id:number):Observable<Object>{
    return this.httpClient.delete(environment.baseUrl.concat('deleteServiceById/').concat(`${id}`));
  }
  
}
