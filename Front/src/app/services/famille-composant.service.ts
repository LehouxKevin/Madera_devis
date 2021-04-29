import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {FamilleComposant} from '../class/famille-composant';

@Injectable({
  providedIn: 'root'
})
export class FamilleComposantService {

  baseUrl = environment.baseUrlAPI;
  FamilleComposantApi = '/famille_composants';

  constructor(private http: HttpClient) {
  }

  getFamillesComposant(): Observable<FamilleComposant[]> {
    return this.http.get<FamilleComposant[]>(this.baseUrl + this.FamilleComposantApi);
  }

  // tslint:disable-next-line:typedef
  asyncGetFamillesComposant() {
    return this.http.get<FamilleComposant[]>(this.baseUrl + this.FamilleComposantApi);
  }

  // tslint:disable-next-line:typedef
  getOneFamilleComposantById(id) {
    return this.http.get<any[]>(this.baseUrl + this.FamilleComposantApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  getOneFamilleComposantByForeignKey(FK) {
    return this.http.get<any[]>(this.baseUrl + FK).toPromise();
  }

  // tslint:disable-next-line:typedef
  asyncgetOneFamilleComposantByForeignKey(FK) {
    return this.http.get<any[]>(this.baseUrl + FK);
  }

  // tslint:disable-next-line:typedef
  addFamilleComposant(familleComposant: FamilleComposant) {
    return this.http.post<FamilleComposant>(this.baseUrl + this.FamilleComposantApi, familleComposant)
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
