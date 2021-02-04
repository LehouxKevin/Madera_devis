import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeRemplissage } from '../class/type-remplissage';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeRemplissageService {


 baseUrl = environment.baseUrlAPI;
  TypeRemplissageApi = '//api/type_remplissages';
constructor(private http: HttpClient) { }

  getTypeRemplissages(): Observable<TypeRemplissage[]>
  {
    return this.http.get<TypeRemplissage[]>(this.baseUrl+this.TypeRemplissageApi);
  }

  getOneTypeRemplissageById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.TypeRemplissageApi+"/"+id).toPromise();
  }

    getOneTypeRemplissageByICleEtrangere(CleEtrangere)
    {
      return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
    }
}
