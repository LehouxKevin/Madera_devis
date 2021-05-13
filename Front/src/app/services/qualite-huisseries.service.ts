import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {QualiteHuisseries} from '../class/qualite-huisseries';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QualiteHuisseriesService {
  baseUrl = environment.baseUrlAPI;
  QualiteHuisserieApi = '/qualite_huisseries';

  constructor(private http: HttpClient) {
  }

  getQualiteHuisseries(): Observable<QualiteHuisseries[]> {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl + this.QualiteHuisserieApi);
  }

  // tslint:disable-next-line:typedef
  asyncGetQualiteHuisseries() {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl + this.QualiteHuisserieApi);
  }

  // tslint:disable-next-line:typedef
  syncGetQualiteHuisseries() {
    let qualiteHuisseries: QualiteHuisseries[] = [];
    return this.http.get<QualiteHuisseries[]>(this.baseUrl + this.QualiteHuisserieApi)
      .pipe(
        map(qualiteHuisserie => qualiteHuisserie['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      qualiHui => qualiteHuisseries = qualiHui;
    }
  }

  // tslint:disable-next-line:typedef
  getOneQualiteHuisserieById(id) {
    return this.http.get<QualiteHuisseries[]>(this.baseUrl + this.QualiteHuisserieApi + '/' + id);
  }

  // tslint:disable-next-line:typedef
  getOneQualiteHuisserieByICleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  asyncGetOneQualiteHuisserieByCleEtrangere(CleEtrangere) {
    return this.http.get<any[]>(this.baseUrl + CleEtrangere).toPromise();
  }

  // tslint:disable-next-line:typedef
  addQualiteHuisserie(qualiteHuisserie: QualiteHuisseries) {
    return this.http.post<QualiteHuisseries>(this.baseUrl + this.QualiteHuisserieApi, qualiteHuisserie)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si la qualité huisserie a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
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
