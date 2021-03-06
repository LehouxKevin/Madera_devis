import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Gamme} from '../class/Gamme';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';
import {ModeleService} from 'src/app/services/modele.service';
import {ModuleService} from 'src/app/services/module.service';
import {Modele} from '../class/modele';

@Injectable({
  providedIn: 'root'
})
export class GammeService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ld+json',
    })
  };

  baseUrl = environment.baseUrlAPI;
  gammesApi = '/gammes';
  public modeles: Modele[] = [];

  constructor(private http: HttpClient, private modeleService: ModeleService, private moduleService: ModuleService) {
  }

  retValDeleteGamme = false;

  getGammes(): Observable<Gamme[]> {
    return this.http.get<Gamme[]>(this.baseUrl + this.gammesApi);
  }

  // tslint:disable-next-line:typedef
  getOneGammeById(id) {
    console.log(this.baseUrl + this.gammesApi + '/' + id);
    return this.http.get<any[]>(this.baseUrl + this.gammesApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  syncGetGammes() {
    return this.http.get<Gamme[]>(this.baseUrl + this.gammesApi)
      .pipe(
        map(gamme => gamme['hydra:member']),
        catchError(this.handleError.bind(this))
      ).toPromise();

  }

  // tslint:disable-next-line:typedef
  syncUpdateGamme(gammes: Gamme) {
    console.log(gammes, ' | ', gammes.id);
    return this.http.put<Gamme>(this.baseUrl + this.gammesApi + '/' + gammes.id, gammes)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }

  async asyncDeleteGamme(idGamme: number): Promise<boolean> {

    await this.modeleService.deleteModeleCleGamme(idGamme);
    console.log("fin de delete");
    await this.moduleService.deleteModuleCleGamme(idGamme);


    this.retValDeleteGamme = false;
    this.http.delete(this.baseUrl + this.gammesApi + '/' + idGamme)
      .subscribe({
        next: data => {
          this.retValDeleteGamme = true;
        },
        error: error => {
          console.error('There was an error!', error);
        }
      });
    return this.retValDeleteGamme;
  }

// tslint:disable-next-line:typedef
  addGamme(gammes: Gamme) {
    return this.http.post<Gamme>(this.baseUrl + this.gammesApi, gammes)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré
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
