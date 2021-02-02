import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FinitionExterieur } from '../class/finition-exterieur';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FinitionExterieurService {

 baseUrl = environment.baseUrlAPI;
  FinitionExterieurApi = '/finition_exterieurs';
constructor(private http: HttpClient) { }

  getFinitionExterieurs(): Observable<FinitionExterieur[]>
  {
    return this.http.get<FinitionExterieur[]>(this.baseUrl+this.FinitionExterieurApi);
  }

  getOneFinitionExterieurById(id)
  {
    return this.http.get<FinitionExterieur[]>(this.baseUrl+this.FinitionExterieurApi+"/"+id);
  }


     getOneFinitionExterieurByICleEtrangere(CleEtrangere)
      {
        return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
      }
}
