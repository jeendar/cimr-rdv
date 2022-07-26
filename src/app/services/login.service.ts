import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../helpers/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getUserInfo(userName : string):Observable<Auth>{
    const url = `http://localhost:8080/api/gestionrdv/signin?username=${userName}`;
    return this.http.get<Auth>(url);
  }
}
