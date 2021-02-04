import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CoupeDePrincipes } from '../class/coupe-de-principes';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class CoupeDePrincipeService {

  baseUrl = environment.baseUrlAPI;
   CoupeDePrincipeApi = '/coupe_de_principes';
 constructor(private http: HttpClient) { }

   getCoupeDePrincipes(): Observable<CoupeDePrincipes[]>
   {
     return this.http.get<CoupeDePrincipes[]>(this.baseUrl+this.CoupeDePrincipeApi);
   }

   getOneCoupeDePrincipeById(id)
   {
     return this.http.get<any[]>(this.baseUrl+this.CoupeDePrincipeApi+"/"+id).toPromise();
   }

     getOneCoupeDePrincipeByICleEtrangere(CleEtrangere)
     {
       return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
     }

}