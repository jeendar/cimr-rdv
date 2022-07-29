import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Conseiller } from '../models/conseiller';

@Injectable({
  providedIn: 'root'
})
export class ConseillersService {

  constructor(private http: HttpClient) { }

  getConseiller(id: number): Observable<Conseiller> {
    return this.http.get<Conseiller>(`${environment.baseUrl}/${id}`);
  }

  createConseiller(conseiller: Conseiller): Observable<Object> {
    return this.http.post(environment.baseUrl.concat('ajouterconseiller'), conseiller);
  }

  updateConseiller( value: Conseiller): Observable<Object> {
    return this.http.put(environment.baseUrl.concat('Modifierconseiller'), value);
  }

  deleteConseiller(id: number): Observable<any> {
    return this.http.delete(environment.baseUrl.concat(`Supprimerconseiller/${id}`), { responseType: 'text' });
  }

  getConseillersList(): Observable<Conseiller[]> {
      return this.http.get<Conseiller[]>(environment.baseUrl.concat('conseillers'));
    /*return of(new Array(10).fill(0).map((_, index) => ({
        idconseiller: index,
        matricule: `685`,
        nom: `NomConseiller A${index}`,
        prenom: `PrénomConseiller A${index}`,
        adressemail: `conseiller-abcd@cimr.ma`,
        agence: {
          idagence: index,
          libelleagence: 'agence casa',
          adresseagence: 'rue 9 N 19 Casablanca',
          latitude: 16,
          longitude: 5,
          locationagence: 'https://location.com'
          }
      })));*/
  }
}