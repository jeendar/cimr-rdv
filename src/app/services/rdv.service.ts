import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rendezvous } from '../models/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  constructor(private http: HttpClient) { }

  getRdv(id: number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${id}`);
  }

  reserverRdv(rdv: Rendezvous): Observable<Object> {
    return this.http.post(`${environment.baseUrl}` + 'prendreRdv' , rdv);
  }

  updateRdv(id: number, value: any): Observable<Object> {
    return this.http.put(`${environment.baseUrl}/${id}`, value);
  }

  deleteRdv(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRdvList(): Observable<any> {
    return this.http.get(`${environment.baseUrl}`);
  }
}