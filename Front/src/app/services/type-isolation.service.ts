import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeIsolation } from '../class/type-isolation';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TypeIsolationService {


  baseUrl = environment.baseUrlAPI;
  TypeIsolationApi = '/type_isolations';
  constructor(private http: HttpClient) { }

  getTypeIsolations(): Observable<TypeIsolation[]>
  {
    return this.http.get<TypeIsolation[]>(this.baseUrl+this.TypeIsolationApi);
  }

  syncGetTypesIsolation()
  {
    var typesIsolation:TypeIsolation[] = [];
    return this.http.get<TypeIsolation[]>(this.baseUrl+this.TypeIsolationApi)
    .pipe(
      map(typeIsolation => typeIsolation['hydra:member'])
    )
    .toPromise()
    .then()
    {
      typeIso => typesIsolation = typeIso;
    };
  }

  getOneTypeIsolationById(id)
  {
    return this.http.get<TypeIsolation[]>(this.baseUrl+this.TypeIsolationApi+"/"+id);
  }

  getOneTypeIsolationByICleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }
}
