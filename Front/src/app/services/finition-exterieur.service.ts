import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FinitionExterieur} from '../class/finition-exterieur';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FinitionExterieurService {

  baseUrl = environment.baseUrlAPI;
  FinitionExterieurApi = '/finition_exterieurs';

  constructor(private http: HttpClient) {
  }

  getFinitionExterieurs(): Observable<FinitionExterieur[]> {
    return this.http.get<FinitionExterieur[]>(this.baseUrl + this.FinitionExterieurApi);
  }

  // tslint:disable-next-line:typedef
  asyncGetFinitionsExterieur() {
    return this.http.get<FinitionExterieur[]>(this.baseUrl + this.FinitionExterieurApi);
  }

  // tslint:disable-next-line:typedef
  syncGetFinitionsExterieur() {
    let finitionsExterieur: FinitionExterieur[] = [];
    return this.http.get<FinitionExterieur[]>(this.baseUrl + this.FinitionExterieurApi)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        map(finitionsExterieur => finitionsExterieur['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      finitions => finitionsExterieur = finitions;
    }
  }

  // tslint:disable-next-line:typedef
  getOneFinitionExterieurById(id) {
    return this.http.get<FinitionExterieur[]>(this.baseUrl + this.FinitionExterieurApi + '/' + id);
  }

  // tslint:disable-next-line:typedef
  getOneFinitionExterieurByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  asyncGetOneFinitionExterieurByCleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  addFinitionExterieure(finitionExterieure: FinitionExterieur) {
    return this.http.post<FinitionExterieur>(this.baseUrl + this.FinitionExterieurApi, finitionExterieure)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si la finition extérieur a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
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
