import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modele } from '../class/Modele';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

 baseUrl = environment.baseUrlAPI;
  ModelesApi = '/modeles';
constructor(private http: HttpClient) { }

  getModeles(): Observable<Modele[]>
  {
    return this.http.get<Modele[]>(this.baseUrl+this.ModelesApi);
  }

  getOneModeleById(id)
  {
    return this.http.get<Modele[]>(this.baseUrl+this.ModelesApi+"/"+id);
  }
}
