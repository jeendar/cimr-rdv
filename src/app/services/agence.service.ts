import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry, throwError } from 'rxjs';
import { Agence } from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'http://localhost:8080/api/gestionrdv/';

  constructor(private http: HttpClient) { }

  getAgence(id: number): Observable<Agence> {
    return this.http.get(`${this.baseUrl}`.concat(`getAgency/${id}`));
  }

  createAgence(data: Agence): Observable<Object> {
    return this.http.post(`${this.baseUrl}`.concat('AddAgency'), data);
  }

  updateAgence( value: Agence): Observable<Object> {
    return this.http.put(`${this.baseUrl}`.concat('updateAgency'), value);
  }

  deleteAgence(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}`.concat(`deleteAgency/${id}`));
  }

  getAgencesList(): Observable<Agence[]> {
    return of(new Array(3).fill(0).map((_, index) => ({
      idagence: index,
      libelleagence: `libelleagence A${index}`,
      adresseagence: `oui`,
      locationagence:'',
      latitude: index,
      longitude:index
    })));

    //return this.http.get<Agence[]>(`${this.baseUrl}`.concat('getAllAgencies'));
  }

}