import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {retry} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/user';
// private baseUrl = 'http://192.168.111.118:8080/Gestion_RDV/api/gestionrdv/user';

  constructor( private http: HttpClient) { }


  getPublicContent(): Observable<any> {
    return this.http.get(this.baseUrl + 'all', { responseType: 'text' });
  }

  getUserDashboard(): Observable<any> {
    return this.http.get(this.baseUrl + 'user', { responseType: 'text' });
  }
  
  getConseillerDashboard(): Observable<any> {
    return this.http.get(this.baseUrl + 'conseiller', { responseType: 'text' });
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get(this.baseUrl + 'admin', { responseType: 'text' });
  }
  // login(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
  //   return this.authenticationService.authenticate(authenticationRequest);
  // }

  // getUserByEmail(email?: string): Observable<UtilisateurDto> {
  //   if (email !== undefined) {
  //     return this.utilisateurService.findByEmail(email);
  //   }
  //   return of();
  // }

  // setAccessToken(authenticationResponse: AuthenticationResponse): void {
  //   localStorage.setItem('accessToken', JSON.stringify(authenticationResponse));
  // }

  // setConnectedUser(utilisateur: UtilisateurDto): void {
  //   localStorage.setItem('connectedUser', JSON.stringify(utilisateur));
  // }

  // getConnectedUser(): UtilisateurDto {
  //   if (localStorage.getItem('connectedUser')) {
  //     return JSON.parse(localStorage.getItem('connectedUser') as string);
  //   }
  //   return {};
  // }

  // changerMotDePasse(changerMotDePasseDto: ChangerMotDePasseUtilisateurDto): Observable<ChangerMotDePasseUtilisateurDto> {
  //   return this.utilisateurService.changerMotDePasse(changerMotDePasseDto);
  // }

  // TODO
  // isUserLoggedAndAccessTokenValid(): boolean {
  //   if (localStorage.getItem('accessToken')) {
  //     // TODO il faut verifier si le access token est valid
  //     return true;
  //   }
  //   this.router.navigate(['login']);
  //   return false;
  // }
}