import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TypeCouverture} from '../class/type-couverture';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TypeCouvertureService {


  baseUrl = environment.baseUrlAPI;
  TypeCouvertureApi = '/type_couvertures';

  constructor(private http: HttpClient) {
  }

  getTypeCouvertures(): Observable<TypeCouverture[]> {
    return this.http.get<TypeCouverture[]>(this.baseUrl + this.TypeCouvertureApi);
  }

  // tslint:disable-next-line:typedef
  asyncGetTypesCouverture() {
    return this.http.get<TypeCouverture[]>(this.baseUrl + this.TypeCouvertureApi);
  }

  // tslint:disable-next-line:typedef
  syncGetTypesCouverture() {
    let typesCouverture: TypeCouverture[] = [];
    return this.http.get<TypeCouverture[]>(this.baseUrl + this.TypeCouvertureApi)
      .pipe(
        map(typeCouverture => typeCouverture['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      tpsCouv => typesCouverture = tpsCouv;
    }
  }

  // tslint:disable-next-line:typedef
  getOneTypeCouvertureById(id) {
    return this.http.get<TypeCouverture[]>(this.baseUrl + this.TypeCouvertureApi + '/' + id);
  }

  // tslint:disable-next-line:typedef
  getOneTypeCouvertureByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  asyncGetOneTypeCouvertureByCleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }
}
