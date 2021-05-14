import {Injectable} from '@angular/core';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Composant} from '../class/composant';

@Injectable({
  providedIn: 'root'
})
export class ComposantService {

  HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ld+json',
    })
  };
  retValDeleteComposant = false;

  baseUrl = environment.baseUrlAPI;
  ComposantsApi = '/composants';
  public composants: Composant[] = [];


  constructor(private http: HttpClient) {
  }

  getComposants(): Observable<Composant[]> {
    return this.http.get<Composant[]>(this.baseUrl + this.ComposantsApi);
  }

  // tslint:disable-next-line:typedef
  getOneComposantById(id): Promise<Composant[]>{
    return this.http.get<Composant[]>(this.baseUrl + this.ComposantsApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  syncUpdateComposant(Composants: Composant) {
    console.log(Composants, ' | ', Composants.id);
    return this.http.put<Composant>(this.baseUrl + this.ComposantsApi + '/' + Composants.id, Composants)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  // tslint:disable-next-line:typedef
  UpdateComposant(Composants: Composant) {
    console.log(Composants, ' | ', Composants.id);
    return this.http.put<Composant>(this.baseUrl + this.ComposantsApi + '/' + Composants.id, Composants)
      .pipe(
        catchError(this.handleError)
      );
  }

  async asyncDeleteComposant(idComposant: number): Promise<boolean> {
    this.retValDeleteComposant = false;

    this.http.delete(this.baseUrl + this.ComposantsApi + '/' + idComposant)
      .subscribe({
        next: data => {
          this.retValDeleteComposant = true;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    return this.retValDeleteComposant;
  }

/*
  // tslint:disable-next-line:typedef
  async DeletelisteComposant(idModele) {
    console.log('point 6 Composant');

    this.composants = await this.composants.filter(composant => Composant.modele === '/api/modeles/' + idModele);
    console.log(this.composants);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.composants.length; i++) {
      await this.asyncDeleteComposant(this.composants[i].id);
      console.log('point 1 Composant');


    }

  }

  // tslint:disable-next-line:typedef
  syncgetComposants() {
    return this.http.get<Composant[]>(this.baseUrl + this.ComposantsApi)
      .pipe(
        map(composant => composant['hydra:member'])
      )
      .toPromise()
      .then();
    {
      // tslint:disable-next-line:no-unused-expression
      composant => this.composants = composant;
    }
  }

  // tslint:disable-next-line:typedef
  async deleteComposantCleModele(idModele) {
    this.composants = await this.syncgetComposants();
    console.log('point 9 Composant');

    await this.DeletelisteComposant(idModele);
    console.log('point 5 Composant');
    return true;
  }*/


  // tslint:disable-next-line:typedef
  addComposant(Composants: Composant) {
    return this.http.post<Composant>(this.baseUrl + this.ComposantsApi, Composants)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si composant a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
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
