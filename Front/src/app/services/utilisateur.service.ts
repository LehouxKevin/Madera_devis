import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  baseUrl = environment.baseUrlAPI;
  utilisateurApi = '/utilisateurs';

  constructor(private http: HttpClient) { }

  getUtilisateurs(): Observable<any[]> 
  {
    return this.http.get<any[]>(this.baseUrl+this.utilisateurApi);
  }
}
