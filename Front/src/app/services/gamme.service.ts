import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Gamme } from '../class/Gamme';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GammeService {

 baseUrl = environment.baseUrlAPI;
  gammesApi = '/gammes';
constructor(private http: HttpClient) { }

  getGammes(): Observable<Gamme[]>
  {
    return this.http.get<Gamme[]>(this.baseUrl+this.gammesApi);
  }

  getOneGammeById(id)
  {
    return this.http.get<Gamme[]>(this.baseUrl+this.gammesApi+"/"+id);
  }

}
