import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etage } from '../class/Etage';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EtageService {

  HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/ld+json',
      })
    };
      retValDeleteEtage:boolean=false;

   baseUrl = environment.baseUrlAPI;
    EtagesApi = '/etages';
  constructor(private http: HttpClient) { }

    getEtages(): Observable<Etage[]>
    {
      return this.http.get<Etage[]>(this.baseUrl+this.EtagesApi);
    }

    getOneEtageById(id)
    {
      return this.http.get<Etage[]>(this.baseUrl+this.EtagesApi+"/"+id).toPromise();
    }

    syncUpdateEtage(etages:Etage)
        {
          console.log(etages,  " | " ,  etages.id);
          return this.http.put<Etage>(this.baseUrl+this.EtagesApi+"/"+etages.id,etages)
          .pipe(
            catchError(this.handleError)
          ).toPromise();
        }

          asyncDeleteEtage(idEtage:number): boolean
          {
            this.retValDeleteEtage=false;
            this.http.delete(this.baseUrl+this.EtagesApi+"/"+idEtage)
                .subscribe({
                    next: data => {
                        this.retValDeleteEtage = true;
                    },
                    error: error => {
                        console.error('There was an error!', error);
                    }
                });
            return this.retValDeleteEtage;
          }

    addEtage(etages:Etage)
      {
        return this.http.post<Etage>(this.baseUrl+this.EtagesApi,etages)
        .pipe(
          catchError(this.handleError)
        ).toPromise().then(data => {
            // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
            if(data.id > 0)
            {
              return true;
            }
            else {
              return false;
            }
        });}
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
