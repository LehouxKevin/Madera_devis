import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeUtilisateurService {

  baseUrl = environment.baseUrlAPI;
  typeUtilisateurApi = '/type_utilisateurs';

  constructor(private http: HttpClient) { }

  getTypesUtilisateur(): Observable<any[]>
  {
    return this.http.get<any[]>(this.baseUrl+this.typeUtilisateurApi); 
  }

  getOneTypeUtilisateurById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.typeUtilisateurApi+"/"+id).toPromise();
  }
}
