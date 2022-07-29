import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import {retry} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private http: HttpClient) { }


  getPublicContent(): Observable<any> {
    return this.http.get(environment.baseUrl + 'all', { responseType: 'text' });
  }

  getUserDashboard(): Observable<any> {
    return this.http.get(environment.baseUrl + 'user', { responseType: 'text' });
  }
  
  getConseillerDashboard(): Observable<any> {
    return this.http.get(environment.baseUrl + 'conseiller', { responseType: 'text' });
  }

  getAdminDashboard(): Observable<any> {
    return this.http.get(environment.baseUrl + 'admin', { responseType: 'text' });
  }
  
  getAgencyAdminDashboard(): Observable<any> {
    return this.http.get(environment.baseUrl + 'admin-agence', { responseType: 'text' });
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