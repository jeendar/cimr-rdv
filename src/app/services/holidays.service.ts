import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  private baseUrl = 'http://localhost:8080/api/v1/Holidays';

  constructor(private http: HttpClient) { }

  getHoliday(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createHoliday(Holiday: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, Holiday);
  }

  updateHoliday(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteHoliday(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getHolidaysList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
}