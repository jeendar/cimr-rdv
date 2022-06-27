import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'http://localhost:8080/gestionrdv/agences';

  constructor(private http: HttpClient) { }

  getAgence(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createAgence(Agence: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Agence);
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