import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TypeIsolation} from '../class/type-isolation';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TypeIsolationService {


  baseUrl = environment.baseUrlAPI;
  TypeIsolationApi = '/type_isolations';

  constructor(private http: HttpClient) {
  }

  getTypeIsolations(): Observable<TypeIsolation[]> {
    return this.http.get<TypeIsolation[]>(this.baseUrl + this.TypeIsolationApi);
  }

  // tslint:disable-next-line:typedef
  asyncGetTypesIsolation() {
    return this.http.get<TypeIsolation[]>(this.baseUrl + this.TypeIsolationApi);
  }

  // tslint:disable-next-line:typedef
  syncGetTypesIsolation() {
    let typesIsolation: TypeIsolation[] = [];
    return this.http.get<TypeIsolation[]>(this.baseUrl + this.TypeIsolationApi)
      .pipe(
        map(typeIsolation => typeIsolation['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      typeIso => typesIsolation = typeIso;
    }
  }

  // tslint:disable-next-line:typedef
  getOneTypeIsolationById(id) {
    return this.http.get<TypeIsolation[]>(this.baseUrl + this.TypeIsolationApi + '/' + id);
  }

  // tslint:disable-next-line:typedef
  getOneTypeIsolationByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  asyncGetOneTypeIsolationByCleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }
}
