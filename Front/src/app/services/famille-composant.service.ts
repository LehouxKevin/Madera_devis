import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FamilleComposant } from '../class/famille-composant';

@Injectable({
  providedIn: 'root'
})
export class FamilleComposantService {

  baseUrl = environment.baseUrlAPI;
  FamilleComposantApi = "/famille_composants"

  constructor(private http: HttpClient) { }

  getFamillesComposant(): Observable<FamilleComposant[]>
  {
    return this.http.get<FamilleComposant[]>(this.baseUrl+this.FamilleComposantApi);
  }

  asyncGetFamillesComposant()
  {
    return this.http.get<FamilleComposant[]>(this.baseUrl+this.FamilleComposantApi);
  }

  getOneFamilleComposantById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.FamilleComposantApi+"/"+id).toPromise();
  }

  getOneFamilleComposantByForeignKey(FK)
  {
    return this.http.get<any[]>(this.baseUrl+FK).toPromise();
  }

  asyncgetOneFamilleComposantByForeignKey(FK)
  {
    return this.http.get<any[]>(this.baseUrl+FK);
  }
}
