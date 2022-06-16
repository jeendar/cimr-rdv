import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConseillersService {

  private baseUrl = 'http://localhost:8080/gestion-rdv/api/v1/Conseillers';

  constructor(private http: HttpClient) { }

  getConseiller(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createConseiller(Conseiller: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Conseiller);
  }

  updateConseiller(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteConseiller(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getConseillersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}