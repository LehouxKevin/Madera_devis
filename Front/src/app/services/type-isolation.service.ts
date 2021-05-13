import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
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

  // tslint:disable-next-line:typedef
  addTypeIsolation(typeIsolation: TypeIsolation) {
    return this.http.post<TypeIsolation>(this.baseUrl + this.TypeIsolationApi, typeIsolation)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si le type d'isolation a un id dans la bdd, si il en a un, c'est qu'il a bien été inséré
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
