import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  baseUrl = environment.baseUrlAPI;
  devisApi = '/devis';

  constructor(private http: HttpClient) { }

  getDevis(): Observable<any[]>
  {
    return this.http.get<any[]>(this.baseUrl+this.devisApi);
  }

  getOneDevisById(id) 
  {
    return this.http.get<any[]>(this.baseUrl+this.devisApi+"/"+id).toPromise();
  }
}
