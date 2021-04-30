import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {TypeRemplissage} from '../class/type-remplissage';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';
import {FinitionInterieur} from "../class/finition-interieur";

@Injectable({
  providedIn: 'root'
})
export class TypeRemplissageService {


  baseUrl = environment.baseUrlAPI;
  TypeRemplissageApi = '/type_remplissages';

  constructor(private http: HttpClient) {
  }

  getTypeRemplissages(): Observable<TypeRemplissage[]> {
    return this.http.get<TypeRemplissage[]>(this.baseUrl + this.TypeRemplissageApi);
  }

  // tslint:disable-next-line:typedef
  getOneTypeRemplissageById(id) {
    return this.http.get<any[]>(this.baseUrl + this.TypeRemplissageApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  getOneTypeRemplissageByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  addTypeRemplissage(typeRemplissage: TypeRemplissage) {
    return this.http.post<TypeRemplissage>(this.baseUrl + this.TypeRemplissageApi, typeRemplissage)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si le type de remplissage a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
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
