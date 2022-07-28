import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
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
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient,
    private router: Router) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable(); 
    }
    public get userValue(): User {
      return this.userSubject.value;
    }
  
  login(username: string, password: string) {
    return this.http.post<any>(this.baseUrl + 'signin', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  // signUp(user: User): Observable<any> {
  //   let api = `${this.baseUrl}/signup`;
  //   return this.http.post(api, user).pipe(catchError(this.handleError));
  // }

  reset(username: string, email: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'reset',
      {email: email, username: username},
      httpOptions
    );
  }
  register(username: string, firstName: string, lastName: string, email: string, role: string, password: string): Observable<any> {
    return this.http.post(
      this.baseUrl + 'signup',
      {username: username, firstName: firstName, lastName: lastName, email: email, role: role, password: password},
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
