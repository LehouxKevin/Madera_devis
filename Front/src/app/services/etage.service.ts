import { HttpClient , HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Etage } from '../class/Etage';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';
import {Modele} from '../class/modele';
import {Client} from '../class/client';

@Injectable({
  providedIn: 'root'
})
export class EtageService {

  HttpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/ld+json',
      })
    };
      retValDeleteEtage = false;

   baseUrl = environment.baseUrlAPI;
    EtagesApi = '/etages';
  public etages: Etage[] = [];

  constructor(private http: HttpClient) { }

    getEtages(): Observable<Etage[]>
    {
      return this.http.get<Etage[]>(this.baseUrl + this.EtagesApi);
    }

  // tslint:disable-next-line:typedef
    getOneEtageById(id)
    {
      return this.http.get<Etage[]>(this.baseUrl + this.EtagesApi + '/' +id).toPromise();
    }

  // tslint:disable-next-line:typedef
    syncUpdateEtage(etages: Etage)
        {
          console.log(etages,  " | " ,  etages.id);
          return this.http.put<Etage>(this.baseUrl+this.EtagesApi+"/"+etages.id,etages)
          .pipe(
            catchError(this.handleError)
          ).toPromise();
        }
  UpdateEtage(etages:Etage)
  {
    console.log(etages,  " | " ,  etages.id);
    return this.http.put<Etage>(this.baseUrl+this.EtagesApi+"/"+etages.id,etages)
      .pipe(
        catchError(this.handleError)
      );
  }

          async asyncDeleteEtage(idEtage:number): Promise<boolean>
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



  // tslint:disable-next-line:typedef
  async DeletelisteEtage(idModele) {
    console.log('point 6 etage');

     this.etages = await this.etages.filter(etage => etage.modele === '/api/modeles/' + idModele);
    console.log(this.etages);
    for(var i=0;i<this.etages.length;i++)
    {
      await this.asyncDeleteEtage(this.etages[i].id );
      console.log('point 1 etage');


    }

  }

  // tslint:disable-next-line:typedef
   syncgetEtages()
  {
    return this.http.get<Etage[]>(this.baseUrl + this.EtagesApi)
      .pipe(
        map(etage => etage['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      etage => this.etages = etage;
    }
  }
  // tslint:disable-next-line:typedef
   async deleteEtageCleModele(idModele) {
     this.etages = await this.syncgetEtages();
    console.log('point 9 etage');

     await this.DeletelisteEtage(idModele);
    console.log('point 5 etage');
    return true ;
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
