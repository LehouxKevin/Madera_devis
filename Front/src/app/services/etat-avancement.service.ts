import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EtatAvancement } from '../class/etat-avancement';

@Injectable({
  providedIn: 'root'
})
export class EtatAvancementService {

  baseUrlApi =  environment.baseUrlAPI;
  baseUrl = environment.baseUrl;
  etatAvancement = "/etat_avancements"

  constructor(private http: HttpClient) { }

  getEtatsAvancement(): Observable<any[]>
  {
    return this.http.get<any[]>(this.baseUrlApi+this.etatAvancement);
  }

  getEtatAvancementById(id)
  {
    return this.http.get<any[]>(this.baseUrlApi+this.etatAvancement+"/"+id).toPromise();
  }

  getEtatAvancementByLink(link)
  {
    return this.http.get<EtatAvancement[]>(this.baseUrl+link).toPromise();
  }
}
