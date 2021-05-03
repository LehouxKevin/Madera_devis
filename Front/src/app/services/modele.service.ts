import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modele } from '../class/Modele';
import { map, takeUntil, catchError, tap, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
 httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/ld+json',
    })
  };
    retValDeleteModele=false;

 baseUrl = environment.baseUrlAPI;
  ModelesApi = '/modeles';
constructor(private http: HttpClient) { }

  getModeles(): Observable<Modele[]>
  {
    return this.http.get<Modele[]>(this.baseUrl+this.ModelesApi);
  }

  asyncGetModeles(): Observable<Modele[]>
  {
    return this.http.get<Modele[]>(this.baseUrl+this.ModelesApi);
  }

  getOneModeleById(id)
  {
    return this.http.get<Modele[]>(this.baseUrl+this.ModelesApi+"/"+id).toPromise();
  }

  syncUpdateModele(modeles:Modele)
      {
        console.log(modeles,  " | " ,  modeles.id);
        return this.http.put<Modele>(this.baseUrl+this.ModelesApi+"/"+modeles.id,modeles)
        .pipe(
          catchError(this.handleError)
        ).toPromise();
      }

        asyncDeleteModele(idModele:number): boolean
        {
          this.retValDeleteModele=false;
          this.http.delete(this.baseUrl+this.ModelesApi+"/"+idModele)
              .subscribe({
                  next: data => {
                      this.retValDeleteModele = true;
                  },
                  error: error => {
                      console.error('There was an error!', error);
                  }
              });
          return this.retValDeleteModele;
        }

  addModele(modeles:Modele)
    {
      return this.http.post<Modele>(this.baseUrl + this.ModelesApi, modeles)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
          // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré

          if(data.id > 0)
          {

            return data.id;
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
