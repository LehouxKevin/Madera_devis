import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Modele} from '../class/Modele';
import {map, takeUntil, catchError, tap, finalize} from 'rxjs/operators';
import {EtageService} from 'src/app/services/etage.service';
import {Etage} from '../class/etage';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/ld+json',
    })
  };
  retValDeleteModele = false;

  baseUrl = environment.baseUrlAPI;
  ModelesApi = '/modeles';
  public modeles: Modele[] = [];

  constructor(private http: HttpClient, private etageService: EtageService) {
  }

  getModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.baseUrl + this.ModelesApi);
  }
  // tslint:disable-next-line:typedef
  syncgetModele()
  {
    return this.http.get<Modele[]>(this.baseUrl + this.ModelesApi)
      .pipe(
        map(modele => modele['hydra:member'])
      )
      .toPromise()
      .then();
    {

      // tslint:disable-next-line:no-unused-expression
      modele => this.modeles = modele; console.log('point 10 modele');
    }
  }
  asyncGetModeles(): Observable<Modele[]> {
    return this.http.get<Modele[]>(this.baseUrl + this.ModelesApi);
  }

  // tslint:disable-next-line:typedef
  getOneModeleById(id) {
    return this.http.get<Modele[]>(this.baseUrl + this.ModelesApi + '/' + id).toPromise();
  }

  // tslint:disable-next-line:typedef
  syncUpdateModele(modeles: Modele) {
    console.log(modeles, ' | ', modeles.id);
    return this.http.put<Modele>(this.baseUrl + this.ModelesApi + '/' + modeles.id, modeles)
      .pipe(
        catchError(this.handleError)
      ).toPromise();
  }


  // tslint:disable-next-line:typedef
  async DeletelisteModele(idGamme) {
    console.log('point 6 modele');
    console.log(this.modeles);

    this.modeles = await this.modeles.filter(modele => modele.gamme === '/api/gammes/' + idGamme);
    console.log(this.modeles);
    /*await this.modeles.forEach(async (modele, index) => {
     await this.asyncDeleteModele(modele.id);


    });*/

    for (let i = 0; i < this.modeles.length; i++)
    {
      await this.asyncDeleteModele(this.modeles[i].id);
      console.log('point 1 modele');
    }
    console.log('point 12 modele');

  }

  // tslint:disable-next-line:typedef
  async deleteModeleCleGamme(idGamme) {

    console.log('point 9 modele');

    this.modeles = await this.syncgetModele();
    console.log('point 6.5 modele');

    await this.DeletelisteModele(idGamme);
    console.log('point 5 modele');
    return true;
  }


   async asyncDeleteModele(idModele: number): Promise<boolean> {

    await this.etageService.deleteEtageCleModele(idModele);

    console.log('test modele suite ');

    this.retValDeleteModele = false;
    this.http.delete(this.baseUrl + this.ModelesApi + '/' + idModele)
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

  // tslint:disable-next-line:typedef
  addModele(modeles: Modele) {
    return this.http.post<Modele>(this.baseUrl + this.ModelesApi, modeles)
      .pipe(
        catchError(this.handleError)
      ).toPromise().then(data => {
        // Retourne true si utilisateur a un id dans la bdd, s'il en a un c'est qu'il a bien été inséré

        if (data.id > 0) {

          return data.id;
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
