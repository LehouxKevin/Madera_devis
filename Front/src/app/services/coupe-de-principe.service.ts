import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {CoupeDePrincipes} from '../class/coupe-de-principes';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoupeDePrincipeService {

  baseUrl = environment.baseUrlAPI;
  CoupeDePrincipeApi = '/coupe_de_principes';

  constructor(private http: HttpClient) {
  }

  getCoupeDePrincipes(): Observable<CoupeDePrincipes[]> {
    return this.http.get<CoupeDePrincipes[]>(this.baseUrl + this.CoupeDePrincipeApi);
  }

  // tslint:disable-next-line:typedef
  getOneCoupeDePrincipeById(id) {
    return this.http.get<any[]>(this.baseUrl + this.CoupeDePrincipeApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  getOneCoupeDePrincipeByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  addCoupeDePrincipe(coupeDePrincipe: CoupeDePrincipes) {
    return this.http.post<CoupeDePrincipes>(this.baseUrl + this.CoupeDePrincipeApi, coupeDePrincipe)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si la finition intérieure a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
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
