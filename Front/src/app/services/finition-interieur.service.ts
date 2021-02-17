import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FinitionInterieur } from '../class/finition-interieur';
import { Observable, throwError } from 'rxjs';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinitionInterieurService {

  baseUrl = environment.baseUrlAPI;
  FinitionInterieurApi = '/finition_interieurs';

  constructor(private http: HttpClient) { }
  GetFinitionsInterieur(): Observable<FinitionInterieur[]>
  {
    return this.http.get<FinitionInterieur[]>(this.baseUrl+this.FinitionInterieurApi);
  }

  asyncGetFinitionsInterieur()
  {
    return this.http.get<FinitionInterieur[]>(this.baseUrl+this.FinitionInterieurApi);
  }

  asyncGetOneFinitionInterieurByCleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }

  addFinitionInterieure(finitionInterieure:FinitionInterieur)
  {
    return this.http.post<FinitionInterieur>(this.baseUrl+this.FinitionInterieurApi,finitionInterieure)
    .pipe(
      catchError(this.handleError)
    ).toPromise().then(data => {
        // Retourne true si la finition intérieure a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
        if(data.id > 0)
        {
          return true;
        }
        else {
          return false;
        }
    });
  }

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
