import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
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

  // tslint:disable-next-line:typedef
  addTypeCouverture(typeCouverture: TypeCouverture) {
    return this.http.post<TypeCouverture>(this.baseUrl + this.TypeCouvertureApi, typeCouverture)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si le type de couverture a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
        if (data.id > 0) {
          return true;
        } else {
          return false;
        }
      });
  }

  // tslint:disable-next-line:typedef
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
