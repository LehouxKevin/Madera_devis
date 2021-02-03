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
  retValDeleteFourni:boolean=false;

  constructor(private http: HttpClient) { }

  getDevis(): Observable<any[]>
  {
    return this.http.get<any[]>(this.baseUrl+this.devisApi);
  }

  syncGetDevis()
  {
    return this.http.get<any[]>(this.baseUrl+this.devisApi).toPromise();
  }

  getOneDevisById(id) 
  {
    return this.http.get<any[]>(this.baseUrl+this.devisApi+"/"+id).toPromise();
  }

  asyncDeleteFournisseur(idFournisseur:number): boolean
  {
    this.retValDeleteFourni=false;
    this.http.delete(this.baseUrl+this.devisApi+"/"+idFournisseur)
        .subscribe({
            next: data => {
                this.retValDeleteFourni = true;
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    return this.retValDeleteFourni;
  }
}
