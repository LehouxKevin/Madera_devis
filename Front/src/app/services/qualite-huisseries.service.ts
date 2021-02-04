import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QualiteHuisseries } from '../class/qualite-huisseries';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QualiteHuisseriesService {
  baseUrl =environment.baseUrlAPI;
  QualiteHuisserieApi = '/qualite_huisseries';
constructor(private http: HttpClient) { }

  getQualiteHuisseries(): Observable<QualiteHuisseries[]>
  {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl+this.QualiteHuisserieApi);
  }

  asyncGetQualiteHuisseries()
  {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl+this.QualiteHuisserieApi);
  }

  syncGetQualiteHuisseries()
  {
    var qualiteHuisseries:QualiteHuisseries[] = [];
    return this.http.get<QualiteHuisseries[]>(this.baseUrl+this.QualiteHuisserieApi)
    .pipe(
      map(qualiteHuisserie => qualiteHuisserie['hydra:member'])
    )
    .toPromise()
    .then()
    {
      qualiHui => qualiteHuisseries = qualiHui;
    };
  }

  getOneQualiteHuisserieById(id)
  {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl+this.QualiteHuisserieApi+"/"+id);
  }


  getOneQualiteHuisserieByICleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }

  asyncGetOneQualiteHuisserieByCleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }
}
