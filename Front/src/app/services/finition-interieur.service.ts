import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FinitionInterieur } from '../class/finition-interieur';
import { Observable } from 'rxjs';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinitionInterieurService {

  baseUrl = environment.baseUrlAPI;
  FinitionInterieurApi = '/finition_interieurs';

  constructor(private http: HttpClient) { }
  GetFinitionsInterieur(): Observable<FinitionInterieur[]>
  {
    return this.http.get<FinitionInterieur[]>(this.baseUrl+this.FinitionInterieurApi);
  }

  asyncGetFinitionsInterieur()
  {
    return this.http.get<FinitionInterieur[]>(this.baseUrl+this.FinitionInterieurApi);
  }

  asyncGetOneFinitionInterieurByCleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }
}
