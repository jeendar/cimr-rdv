import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json','Access-Control-Allow-Credentials':'false' } ),
  withCredentials: false
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://192.168.111.118:8080/Gestion_RDV/api/gestionrdv/';

  constructor(private http: HttpClient) {}
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'login',
      {username, password},
      httpOptions
    );
  }

  // signUp(user: User): Observable<any> {
  //   let api = `${this.baseUrl}/signup`;
  //   return this.http.post(api, user).pipe(catchError(this.handleError));
  // }

  register(username: string, email: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'signup',
      {email: email, username: username},
      httpOptions
    );
  }

  // register(user): Observable<any>{
  //   return this.http.post(this.baseUrl + 'signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }, httpOptions);
  // }
  
  logout(): Observable<any> {
    return this.http.post(this.baseUrl + 'signout', {}, httpOptions);
  }
  
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
