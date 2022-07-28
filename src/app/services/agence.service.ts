import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agence } from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

 

  constructor(private http: HttpClient) { }

  getAgence(id: number): Observable<Agence> {
    return this.http.get(`${environment.baseUrl}`.concat(`getAgency/${id}`));
  }

  createAgence(data: Agence): Observable<Object> {
    return this.http.post(`${environment.baseUrl}`.concat('AddAgency'), data);
  }

  updateAgence( value: Agence): Observable<Object> {
    return this.http.put(`${environment.baseUrl}`.concat('updateAgency'), value);
  }

  deleteAgence(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}`.concat(`deleteAgency/${id}`));
  }

  getAgencesList(): Observable<Agence[]> {
    return of(new Array(3).fill(0).map((_, index) => ({
      idagence: index,
      libelleagence: `libelleagence A${index}`,
      adresseagence: `oui`,
      locationagence:'',
      latitude: `${index}`,
      longitude:`${index}`
    })));

    //return this.http.get<Agence[]>(`${this.baseUrl}`.concat('getAllAgencies'));
  }

}