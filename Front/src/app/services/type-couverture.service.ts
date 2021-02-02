import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeCouverture } from '../class/type-couverture';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TypeCouvertureService {


 baseUrl = environment.baseUrlAPI;
  TypeCouvertureApi = '/type_couvertures';
constructor(private http: HttpClient) { }

  getTypeCouvertures(): Observable<TypeCouverture[]>
  {
    return this.http.get<TypeCouverture[]>(this.baseUrl+this.TypeCouvertureApi);
  }

  getOneTypeCouvertureById(id)
  {
    return this.http.get<TypeCouverture[]>(this.baseUrl+this.TypeCouvertureApi+"/"+id);
  }

   getOneTypeCouvertureByICleEtrangere(CleEtrangere)
      {
        return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
      }
}
