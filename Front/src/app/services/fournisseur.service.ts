import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Fournisseur } from '../class/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  baseUrl = environment.baseUrlAPI;
  fournisseurApi = '/fournisseurs';

  retValDeleteFourni:boolean=false;
  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<any[]>
  {
    return this.http.get<any[]>(this.baseUrl+this.fournisseurApi);
  }

  getOneFournisseurById(id)
  {
    return this.http.get<any[]>(this.baseUrl+this.fournisseurApi+"/"+id).toPromise();
  }

  addFournisseur(fournisseur:Fournisseur)
  {
    return this.http.post<Fournisseur>(this.baseUrl+this.fournisseurApi,fournisseur)
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
    });
  }

  // Peut être la faire en sync ?
  asyncDeleteFournisseur(idFournisseur:number): boolean
  {
    this.retValDeleteFourni=false;
    this.http.delete(this.baseUrl+this.fournisseurApi+"/"+idFournisseur)
        .subscribe({
            next: data => {
                this.retValDeleteFourni = true;
            },
            error: error => {
                console.error('There was an error!', error);
            }
        });
    return this.retValDeleteFourni;
  }


  syncUpdateFournisseur(fournisseur:Fournisseur)
  {
    console.log(fournisseur,  " | " ,  fournisseur.id);
    return this.http.put<Fournisseur>(this.baseUrl+this.fournisseurApi+"/"+fournisseur.id,fournisseur)
    .pipe(
      catchError(this.handleError)
    ).toPromise();
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
