import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConceptionOssature } from '../class/conception-ossature';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})


export class ConceptionOssatureService {

 baseUrl = environment.baseUrlAPI;
  ConceptionOssatureApi = '/conception_ossatures';
constructor(private http: HttpClient) { }

  getConceptionOssatures(): Observable<ConceptionOssature[]>
  {
    return this.http.get<ConceptionOssature[]>(this.baseUrl+this.ConceptionOssatureApi);
  }

  asyncGetConceptionOssatures()
  {
    return this.http.get<ConceptionOssature[]>(this.baseUrl+this.ConceptionOssatureApi);
  }

  getOneConceptionOssatureById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.ConceptionOssatureApi+"/"+id).toPromise();
  }

  getOneConceptionOssatureByICleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere).toPromise();
  }

  asyncGetOneConceptionOssatureByCleEtrangere(CleEtrangere)
  {
    return this.http.get<any[]>(this.baseUrl+CleEtrangere);
  }

  addConceptionOssature(conceptionOssature:ConceptionOssature)
  {
    return this.http.post<ConceptionOssature>(this.baseUrl+this.ConceptionOssatureApi,conceptionOssature)
    .pipe(
      catchError(this.handleError)
    ).toPromise().then(data => {
        // Retourne true si la conception ossature a un id dans la bdd, si elle en a un c'est qu'elle a bien été inséré
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
