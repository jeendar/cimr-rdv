import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Agence } from '../models/agence';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'http://localhost:8080/gestionrdv/agences';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // getAgence(id: number): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/${id}`);
  // }
  // addAgency(data: Agence): Observable<Agence> {
  //   return this.http
  //     .post<Agence>(
  //       this.baseUrl,
  //       JSON.stringify(data),
  //       this.httpOptions
  //     )
  // }
  createAgence(data: any) {
    return this.http.post<any>(`${this.baseUrl}`, data);
  }

  updateAgence(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteAgence(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAgencesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}